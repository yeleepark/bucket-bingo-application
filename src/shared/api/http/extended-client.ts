import { HttpClient, HttpClientConfig, HttpError, HttpResponse, RequestOptions } from './client';
import { ErrorInterceptor, InterceptorManager, RequestInterceptor, ResponseInterceptor } from './interceptors';

/**
 * Extended HTTP Client with interceptor support
 */
export class ExtendedHttpClient extends HttpClient {
  private interceptorManager: InterceptorManager;

  constructor(config: HttpClientConfig = {}) {
    super(config);
    this.interceptorManager = new InterceptorManager();
  }

  /**
   * Add request interceptor
   */
  addRequestInterceptor(interceptor: RequestInterceptor): () => void {
    return this.interceptorManager.addRequestInterceptor(interceptor);
  }

  /**
   * Add response interceptor
   */
  addResponseInterceptor(interceptor: ResponseInterceptor): () => void {
    return this.interceptorManager.addResponseInterceptor(interceptor);
  }

  /**
   * Add error interceptor
   */
  addErrorInterceptor(interceptor: ErrorInterceptor): () => void {
    return this.interceptorManager.addErrorInterceptor(interceptor);
  }

  /**
   * Override request method to include interceptors
   */
  protected async requestWithInterceptors<T>(
    method: string,
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<HttpResponse<T>> {
    try {
      // Process request through interceptors
      const { url: processedUrl, options: processedOptions } = 
        await this.interceptorManager.processRequest(url, { 
          ...options, 
          method, 
          body 
        });

      // Make the actual request
      const response = await super['request']<T>(
        processedOptions.method,
        processedUrl,
        processedOptions.body,
        processedOptions
      );

      // Process response through interceptors
      return await this.interceptorManager.processResponse(response, {
        url: processedUrl,
        method: processedOptions.method,
      });
    } catch (error) {
      // Process error through interceptors
      if (HttpError.isHttpError(error)) {
        const interceptedResponse = await this.interceptorManager.processError(error, {
          url,
          method,
        });
        return interceptedResponse as HttpResponse<T>;
      }
      throw error;
    }
  }

  /**
   * GET request with interceptors
   */
  async get<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.requestWithInterceptors<T>('GET', url, undefined, options);
  }

  /**
   * POST request with interceptors
   */
  async post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.requestWithInterceptors<T>('POST', url, body, options);
  }

  /**
   * PUT request with interceptors
   */
  async put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.requestWithInterceptors<T>('PUT', url, body, options);
  }

  /**
   * PATCH request with interceptors
   */
  async patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.requestWithInterceptors<T>('PATCH', url, body, options);
  }

  /**
   * DELETE request with interceptors
   */
  async delete<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.requestWithInterceptors<T>('DELETE', url, undefined, options);
  }

  /**
   * HEAD request with interceptors
   */
  async head(url: string, options?: RequestOptions): Promise<HttpResponse<null>> {
    return this.requestWithInterceptors<null>('HEAD', url, undefined, options);
  }

  /**
   * OPTIONS request with interceptors
   */
  async options<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.requestWithInterceptors<T>('OPTIONS', url, undefined, options);
  }
} 