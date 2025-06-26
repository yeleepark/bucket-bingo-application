import { HttpClientConfig } from './client';
import { ExtendedHttpClient } from './extended-client';
import { commonInterceptors } from './interceptors';

/**
 * Create a basic API client with common configuration
 */
export function createApiClient(config: HttpClientConfig = {}): ExtendedHttpClient {
  const client = new ExtendedHttpClient({
    baseURL: '/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

  // Add common interceptors
  if (process.env.NODE_ENV === 'development') {
    client.addRequestInterceptor(commonInterceptors.requestLogger());
    client.addResponseInterceptor(commonInterceptors.responseLogger());
    client.addErrorInterceptor(commonInterceptors.errorLogger());
  }

  return client;
}

/**
 * Create an authenticated API client
 */
export function createAuthenticatedClient(
  token: string,
  config: HttpClientConfig = {}
): ExtendedHttpClient {
  const client = createApiClient(config);

  // Add authentication
  client.addRequestInterceptor(commonInterceptors.auth(token));

  // Add retry for failed requests
  client.addErrorInterceptor(commonInterceptors.retry(3, 1000));

  return client;
}

/**
 * Create a client for external APIs
 */
export function createExternalApiClient(
  baseURL: string,
  apiKey?: string,
  config: HttpClientConfig = {}
): ExtendedHttpClient {
  const client = new ExtendedHttpClient({
    baseURL,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
    ...config,
  });

  // Add API key if provided
  if (apiKey) {
    client.addRequestInterceptor(commonInterceptors.apiKey(apiKey));
  }

  // Add common interceptors for external APIs
  if (process.env.NODE_ENV === 'development') {
    client.addRequestInterceptor(commonInterceptors.requestLogger());
    client.addResponseInterceptor(commonInterceptors.responseLogger());
  }

  // Add retry for external APIs (more aggressive)
  client.addErrorInterceptor(commonInterceptors.retry(5, 2000));

  return client;
}

/**
 * Create a client with custom timeout for file uploads
 */
export function createFileUploadClient(
  config: HttpClientConfig = {}
): ExtendedHttpClient {
  return new ExtendedHttpClient({
    baseURL: '/api',
    timeout: 300000, // 5 minutes for file uploads
    headers: {
      // Don't set Content-Type for file uploads, let browser set it with boundary
    },
    ...config,
  });
} 