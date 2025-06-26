import { HttpClient, HttpError, HttpResponse, RequestOptions } from './client';

/**
 * Request interceptor function type
 */
export type RequestInterceptor = (
  url: string,
  options: RequestOptions & { method: string; body?: unknown }
) => Promise<{ url: string; options: RequestOptions & { method: string; body?: unknown } }> | 
  { url: string; options: RequestOptions & { method: string; body?: unknown } };

/**
 * Response interceptor function type
 */
export type ResponseInterceptor = <T>(
  response: HttpResponse<T>,
  request: { url: string; method: string }
) => Promise<HttpResponse<T>> | HttpResponse<T>;

/**
 * Error interceptor function type
 */
export type ErrorInterceptor = (
  error: HttpError,
  request: { url: string; method: string }
) => Promise<HttpResponse<unknown>> | Promise<never> | never;

/**
 * Interceptor manager
 */
export class InterceptorManager {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];
  private errorInterceptors: ErrorInterceptor[] = [];

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    this.requestInterceptors.push(interceptor);
    return () => {
      const index = this.requestInterceptors.indexOf(interceptor);
      if (index !== -1) {
        this.requestInterceptors.splice(index, 1);
      }
    };
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    this.responseInterceptors.push(interceptor);
    return () => {
      const index = this.responseInterceptors.indexOf(interceptor);
      if (index !== -1) {
        this.responseInterceptors.splice(index, 1);
      }
    };
  }

  /**
   * Add error interceptor
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): () => void {
    this.errorInterceptors.push(interceptor);
    return () => {
      const index = this.errorInterceptors.indexOf(interceptor);
      if (index !== -1) {
        this.errorInterceptors.splice(index, 1);
      }
    };
  }

  /**
   * Process request through interceptors
   */
  async processRequest(
    url: string,
    options: RequestOptions & { method: string; body?: unknown }
  ): Promise<{ url: string; options: RequestOptions & { method: string; body?: unknown } }> {
    let result = { url, options };

    for (const interceptor of this.requestInterceptors) {
      result = await interceptor(result.url, result.options);
    }

    return result;
  }

  /**
   * Process response through interceptors
   */
  async processResponse<T>(
    response: HttpResponse<T>,
    request: { url: string; method: string }
  ): Promise<HttpResponse<T>> {
    let result = response;

    for (const interceptor of this.responseInterceptors) {
      result = await interceptor(result, request);
    }

    return result;
  }

  /**
   * Process error through interceptors
   */
  async processError(
    error: HttpError,
    request: { url: string; method: string }
  ): Promise<HttpResponse<unknown> | never> {
    for (const interceptor of this.errorInterceptors) {
      try {
        return await interceptor(error, request);
      } catch (interceptorError) {
        // If interceptor throws, continue to next interceptor
        if (interceptorError instanceof HttpError) {
          error = interceptorError;
        }
      }
    }

    throw error;
  }
}

/**
 * Common interceptors
 */
export const commonInterceptors = {
  /**
   * Add authorization header
   */
  auth: (token: string): RequestInterceptor => 
    (url, options) => ({
      url,
      options: {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        },
      },
    }),

  /**
   * Add API key header
   */
  apiKey: (key: string, headerName = 'X-API-Key'): RequestInterceptor =>
    (url, options) => ({
      url,
      options: {
        ...options,
        headers: {
          ...options.headers,
          [headerName]: key,
        },
      },
    }),

  /**
   * Log requests
   */
  requestLogger: (): RequestInterceptor =>
    (url, options) => {
      console.log(`🚀 HTTP ${options.method} ${url}`, options.body ? options.body : '');
      return { url, options };
    },

  /**
   * Log responses
   */
  responseLogger: (): ResponseInterceptor =>
    (response, request) => {
      console.log(`✅ HTTP ${request.method} ${request.url} - ${response.status}`, response.data);
      return response;
    },

  /**
   * Log errors
   */
  errorLogger: (): ErrorInterceptor =>
    (error, request) => {
      console.error(`❌ HTTP ${request.method} ${request.url} - ${error.status}`, error.data);
      throw error;
    },

  /**
   * Retry on failure
   */
  retry: (maxRetries = 3, retryDelay = 1000): ErrorInterceptor =>
    async (error, request) => {
      if (error.status >= 500 && error.status < 600) {
        // Only retry on server errors
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
          
          try {
            // Create a new HTTP client instance for retry
            const client = new HttpClient();
            // Use proper typing for the request method
            const requestMethod = request.method.toLowerCase() as 'get' | 'post' | 'put' | 'patch' | 'delete';
            
            let response: HttpResponse<unknown>;
            switch (requestMethod) {
              case 'get':
                response = await client.get(request.url);
                break;
              case 'post':
                response = await client.post(request.url);
                break;
              case 'put':
                response = await client.put(request.url);
                break;
              case 'patch':
                response = await client.patch(request.url);
                break;
              case 'delete':
                response = await client.delete(request.url);
                break;
              default:
                throw error;
            }
            
            return response;
          } catch (retryError) {
            if (attempt === maxRetries) {
              throw retryError;
            }
          }
        }
      }
      
      throw error;
    },

  /**
   * Transform response data
   */
  dataTransformer: <From, To>(transformer: (data: From) => To): ResponseInterceptor =>
    <T>(response: HttpResponse<T>) => ({
      ...response,
      data: transformer(response.data as unknown as From) as unknown as T,
    }),
}; 