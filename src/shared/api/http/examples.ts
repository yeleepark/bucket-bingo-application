/**
 * HTTP Client Usage Examples
 * 
 * This file contains examples of how to use the HTTP client in various scenarios.
 * These examples are for documentation purposes and can be copied into your application.
 */

import {
  commonInterceptors,
  createApiClient,
  createAuthenticatedClient,
  createExternalApiClient,
  HttpError
} from './index';

/**
 * Example 1: Basic API calls
 */
export async function basicApiExample() {
  const client = createApiClient();

  try {
    // GET request
    const response = await client.get<{ users: Array<{ id: number; name: string }> }>('/users');
    console.log('Users:', response.data.users);

    // POST request
    const newUser = await client.post<{ id: number; name: string }>('/users', {
      name: 'John Doe',
      email: 'john@example.com'
    });
    console.log('Created user:', newUser.data);

    // PUT request
    const updatedUser = await client.put<{ id: number; name: string }>('/users/1', {
      name: 'Jane Doe',
      email: 'jane@example.com'
    });
    console.log('Updated user:', updatedUser.data);

    // DELETE request
    await client.delete('/users/1');
    console.log('User deleted');

  } catch (error) {
    if (HttpError.isHttpError(error)) {
      console.error('API Error:', error.status, error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

/**
 * Example 2: Authenticated requests
 */
export async function authenticatedApiExample() {
  const authToken = 'your-jwt-token';
  const client = createAuthenticatedClient(authToken);

  try {
    // This request will automatically include Authorization header
    const profile = await client.get<{ id: number; name: string; email: string }>('/profile');
    console.log('User profile:', profile.data);

    // POST request with authentication
    const post = await client.post<{ id: number; title: string }>('/posts', {
      title: 'My New Post',
      content: 'This is the content of my post.'
    });
    console.log('Created post:', post.data);

  } catch (error) {
    if (HttpError.isHttpError(error)) {
      if (error.status === 401) {
        console.error('Authentication failed');
        // Redirect to login
      } else {
        console.error('API Error:', error.status, error.message);
      }
    }
  }
}

/**
 * Example 3: External API calls
 */
export async function externalApiExample() {
  const client = createExternalApiClient(
    'https://jsonplaceholder.typicode.com',
    'your-api-key' // Optional
  );

  try {
    const posts = await client.get<Array<{ id: number; title: string; body: string }>>('/posts');
    console.log('External posts:', posts.data);

  } catch (error) {
    if (HttpError.isHttpError(error)) {
      console.error('External API Error:', error.status, error.message);
    }
  }
}

/**
 * Example 4: Custom interceptors
 */
export async function customInterceptorsExample() {
  const client = createApiClient();

  // Add custom request interceptor
  client.addRequestInterceptor((url, options) => {
    // Add timestamp to all requests
    const timestamp = Date.now();
    return {
      url: `${url}?_t=${timestamp}`,
      options
    };
  });

  // Add custom response interceptor
  client.addResponseInterceptor((response, request) => {
    // Log slow requests
    const responseTime = Date.now() - parseInt(request.url.split('_t=')[1] || '0');
    if (responseTime > 1000) {
      console.warn(`Slow request: ${request.method} ${request.url} took ${responseTime}ms`);
    }
    return response;
  });

  // Add custom error interceptor
  client.addErrorInterceptor((error, request) => {
    // Custom error handling
    if (error.status === 429) {
      console.warn('Rate limited, retrying after delay...');
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          // Retry the request
          client.get(request.url).then(resolve).catch(reject);
        }, 5000);
      });
    }
    throw error; // Re-throw if not handled
  });

  try {
    const data = await client.get('/some-endpoint');
    console.log('Data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

/**
 * Example 5: File upload
 */
export async function fileUploadExample() {
  const client = createApiClient();

  // File upload example
  const fileInput = document.querySelector<HTMLInputElement>('#file-input');
  if (fileInput?.files?.[0]) {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('description', 'My uploaded file');

    try {
      const response = await client.post<{ id: string; url: string }>('/upload', formData, {
        headers: {
          // Don't set Content-Type, let browser set it with multipart boundary
        },
        timeout: 300000 // 5 minutes for file upload
      });
      
      console.log('File uploaded:', response.data);
    } catch (error) {
      if (HttpError.isHttpError(error)) {
        console.error('Upload failed:', error.message);
      }
    }
  }
}

/**
 * Example 6: Request cancellation
 */
export async function requestCancellationExample() {
  const client = createApiClient();
  const controller = new AbortController();

  // Cancel request after 5 seconds
  setTimeout(() => {
    controller.abort();
    console.log('Request cancelled');
  }, 5000);

  try {
    const response = await client.get<{ data: unknown }>('/slow-endpoint', {
      signal: controller.signal
    });
    console.log('Response:', response.data);
  } catch (error) {
    if (HttpError.isHttpError(error) && error.status === 408) {
      console.log('Request was cancelled or timed out');
    }
  }
}

/**
 * Example 7: Parallel requests
 */
export async function parallelRequestsExample() {
  const client = createApiClient();

  try {
    // Make parallel requests
    const [users, posts, comments] = await Promise.all([
      client.get<{ users: unknown }>('/users'),
      client.get<{ posts: unknown }>('/posts'),
      client.get<{ comments: unknown }>('/comments')
    ]);

    console.log('All data loaded:', {
      users: users.data,
      posts: posts.data,
      comments: comments.data
    });

  } catch (error) {
    console.error('One of the requests failed:', error);
  }
}

/**
 * Example 8: Using built-in interceptors
 */
export async function builtInInterceptorsExample() {
  const client = createApiClient();

  // Add built-in interceptors
  client.addRequestInterceptor(commonInterceptors.auth('your-token'));
  client.addRequestInterceptor(commonInterceptors.apiKey('your-api-key'));
  client.addResponseInterceptor(commonInterceptors.responseLogger());
  client.addErrorInterceptor(commonInterceptors.retry(3, 1000));

  // Transform response data
  client.addResponseInterceptor(
    commonInterceptors.dataTransformer((data: { result: unknown }) => data.result)
  );

  try {
    const response = await client.get('/api/data');
    console.log('Transformed data:', response.data);
  } catch (error) {
    console.error('Error with interceptors:', error);
  }
} 