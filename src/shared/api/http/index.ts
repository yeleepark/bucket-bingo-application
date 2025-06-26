// Core HTTP Client
export {
    HttpClient, httpClient, HttpError, type HttpClientConfig,
    type HttpResponse,
    type RequestOptions
} from './client';

// Interceptors
export {
    commonInterceptors, InterceptorManager, type ErrorInterceptor,
    type RequestInterceptor,
    type ResponseInterceptor
} from './interceptors';

// Extended Client with Interceptors
export { ExtendedHttpClient } from './extended-client';

// Preconfigured clients for common use cases
export {
    createApiClient,
    createAuthenticatedClient,
    createExternalApiClient,
    createFileUploadClient
} from './presets';
