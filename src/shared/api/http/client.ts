/**
 * HTTP Client Configuration
 */
export interface HttpClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

/**
 * HTTP Request Options
 */
export interface RequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
  signal?: AbortSignal;
}

/**
 * HTTP Response wrapper
 */
export interface HttpResponse<T = unknown> {
  data: T;
  status: number;
  statusText: string;
  headers: Headers;
}

/**
 * Custom HTTP Error class
 */
export class HttpError extends Error {
  status: number;
  statusText: string;
  data?: unknown;

  constructor(message: string, status: number, statusText: string, data?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.statusText = statusText;
    this.data = data;
  }

  static isHttpError(error: unknown): error is HttpError {
    return error instanceof HttpError;
  }
}

/**
 * HTTP Client class with fetch-based implementation
 */
export class HttpClient {
  private config: HttpClientConfig;

  constructor(config: HttpClientConfig = {}) {
    this.config = {
      baseURL: '',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      ...config,
    };
  }

  /**
   * Build full URL from relative path
   */
  private buildUrl(url: string): string {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    const baseURL = this.config.baseURL || '';
    const cleanBase = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
    const cleanUrl = url.startsWith('/') ? url : `/${url}`;
    
    return `${cleanBase}${cleanUrl}`;
  }

  /**
   * Merge headers with default configuration
   */
  private mergeHeaders(options?: RequestOptions): Headers {
    return new Headers({
      ...this.config.headers,
      ...options?.headers,
    });
  }

  /**
   * Create AbortController with timeout
   */
  private createAbortController(options?: RequestOptions): AbortController {
    const controller = new AbortController();
    const timeout = options?.timeout ?? this.config.timeout;

    if (timeout && timeout > 0) {
      setTimeout(() => controller.abort(), timeout);
    }

    return controller;
  }

  /**
   * Process response and handle errors
   */
  private async processResponse<T>(response: Response): Promise<HttpResponse<T>> {
    let data: T;

    try {
      const contentType = response.headers.get('content-type');
      
      if (contentType?.includes('application/json')) {
        data = await response.json();
      } else {
        data = (await response.text()) as T;
      }
    } catch {
      data = null as T;
    }

    if (!response.ok) {
      const errorMessage = typeof data === 'object' && data && 'message' in data
        ? (data as { message: string }).message
        : `HTTP Error: ${response.status} ${response.statusText}`;
      
      throw new HttpError(errorMessage, response.status, response.statusText, data);
    }

    return {
      data,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    };
  }

  /**
   * Generic request method
   */
  private async request<T>(
    method: string,
    url: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<HttpResponse<T>> {
    const controller = this.createAbortController(options);
    const signal = options?.signal || controller.signal;

    try {
      const response = await fetch(this.buildUrl(url), {
        method,
        headers: this.mergeHeaders(options),
        body: body ? JSON.stringify(body) : undefined,
        signal,
      });

      return this.processResponse<T>(response);
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new HttpError('Request timeout', 408, 'Request Timeout');
      }
      
      if (HttpError.isHttpError(error)) {
        throw error;
      }
      
      throw new HttpError(
        error instanceof Error ? error.message : 'Network error',
        0,
        'Network Error'
      );
    }
  }

  /**
   * GET request
   */
  async get<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>('GET', url, undefined, options);
  }

  /**
   * POST request
   */
  async post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>('POST', url, body, options);
  }

  /**
   * PUT request
   */
  async put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>('PUT', url, body, options);
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>('PATCH', url, body, options);
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>('DELETE', url, undefined, options);
  }

  /**
   * HEAD request
   */
  async head(url: string, options?: RequestOptions): Promise<HttpResponse<null>> {
    return this.request<null>('HEAD', url, undefined, options);
  }

  /**
   * OPTIONS request
   */
  async options<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>> {
    return this.request<T>('OPTIONS', url, undefined, options);
  }
}

/**
 * Default HTTP client instance
 */
export const httpClient = new HttpClient(); 