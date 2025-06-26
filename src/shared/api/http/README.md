# HTTP Client Module

fetch 기반의 공통 HTTP 클라이언트 모듈입니다. axios와 유사한 API를 제공하면서도 브라우저 네이티브 fetch를 기반으로 작동합니다.

## 주요 특징

- 🚀 **fetch 기반**: 브라우저 네이티브 fetch API 사용
- 🔄 **인터셉터 지원**: 요청/응답/에러 인터셉터 
- 🔒 **타입 안전성**: 완전한 TypeScript 지원
- ⚙️ **설정 가능**: 유연한 클라이언트 구성
- 🔁 **재시도 로직**: 자동 재시도 기능
- 📝 **로깅**: 개발 환경에서 자동 로깅
- 🛠️ **사전 구성**: 일반적인 사용 사례를 위한 프리셋

## 설치 및 사용

### 기본 사용법

```typescript
import { createApiClient, HttpError } from '@/shared/api/http';

const client = createApiClient();

try {
  // GET 요청
  const response = await client.get<{ users: User[] }>('/api/users');
  console.log(response.data.users);

  // POST 요청
  const newUser = await client.post<User>('/api/users', {
    name: 'John Doe',
    email: 'john@example.com'
  });

  // PUT 요청
  const updatedUser = await client.put<User>(`/api/users/${newUser.data.id}`, {
    name: 'Jane Doe'
  });

  // DELETE 요청
  await client.delete(`/api/users/${updatedUser.data.id}`);

} catch (error) {
  if (HttpError.isHttpError(error)) {
    console.error('API 에러:', error.status, error.message);
  }
}
```

### 인증된 클라이언트

```typescript
import { createAuthenticatedClient } from '@/shared/api/http';

const authClient = createAuthenticatedClient('your-jwt-token');

// 자동으로 Authorization 헤더가 추가됩니다
const profile = await authClient.get<UserProfile>('/api/profile');
```

### 외부 API 클라이언트

```typescript
import { createExternalApiClient } from '@/shared/api/http';

const externalClient = createExternalApiClient(
  'https://api.external-service.com',
  'your-api-key' // 선택사항
);

const data = await externalClient.get<ExternalData>('/data');
```

### 커스텀 인터셉터

```typescript
import { createApiClient, commonInterceptors } from '@/shared/api/http';

const client = createApiClient();

// 요청 인터셉터 추가
client.addRequestInterceptor((url, options) => {
  console.log(`요청 시작: ${options.method} ${url}`);
  return { url, options };
});

// 응답 인터셉터 추가
client.addResponseInterceptor((response, request) => {
  console.log(`응답 완료: ${request.method} ${request.url} - ${response.status}`);
  return response;
});

// 에러 인터셉터 추가
client.addErrorInterceptor((error, request) => {
  if (error.status === 401) {
    // 인증 실패 시 로그인 페이지로 리다이렉트
    window.location.href = '/login';
  }
  throw error;
});

// 내장 인터셉터 사용
client.addErrorInterceptor(commonInterceptors.retry(3, 1000)); // 3회 재시도
client.addRequestInterceptor(commonInterceptors.requestLogger()); // 요청 로깅
client.addResponseInterceptor(commonInterceptors.responseLogger()); // 응답 로깅
```

### 파일 업로드

```typescript
import { createApiClient } from '@/shared/api/http';

const client = createApiClient();

const formData = new FormData();
formData.append('file', file);
formData.append('description', '파일 설명');

const response = await client.post<{ id: string; url: string }>('/api/upload', formData, {
  timeout: 300000 // 5분 타임아웃
});
```

### 요청 취소

```typescript
import { createApiClient } from '@/shared/api/http';

const client = createApiClient();
const controller = new AbortController();

// 5초 후 요청 취소
setTimeout(() => controller.abort(), 5000);

try {
  const response = await client.get('/api/slow-endpoint', {
    signal: controller.signal
  });
} catch (error) {
  if (HttpError.isHttpError(error) && error.status === 408) {
    console.log('요청이 취소되었습니다');
  }
}
```

## API 레퍼런스

### HttpClient

기본 HTTP 클라이언트 클래스입니다.

```typescript
class HttpClient {
  constructor(config?: HttpClientConfig)
  
  get<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>>
  post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>>
  put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>>
  patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<HttpResponse<T>>
  delete<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>>
  head(url: string, options?: RequestOptions): Promise<HttpResponse<null>>
  options<T>(url: string, options?: RequestOptions): Promise<HttpResponse<T>>
}
```

### ExtendedHttpClient

인터셉터를 지원하는 확장된 HTTP 클라이언트입니다.

```typescript
class ExtendedHttpClient extends HttpClient {
  addRequestInterceptor(interceptor: RequestInterceptor): () => void
  addResponseInterceptor(interceptor: ResponseInterceptor): () => void
  addErrorInterceptor(interceptor: ErrorInterceptor): () => void
}
```

### 설정 인터페이스

```typescript
interface HttpClientConfig {
  baseURL?: string;          // 기본 URL
  timeout?: number;          // 타임아웃 (ms)
  headers?: Record<string, string>; // 기본 헤더
}

interface RequestOptions {
  headers?: Record<string, string>; // 요청별 헤더
  timeout?: number;          // 요청별 타임아웃
  signal?: AbortSignal;      // 요청 취소 시그널
}

interface HttpResponse<T> {
  data: T;                   // 응답 데이터
  status: number;            // HTTP 상태 코드
  statusText: string;        // HTTP 상태 텍스트
  headers: Headers;          // 응답 헤더
}
```

### HttpError

HTTP 에러를 나타내는 클래스입니다.

```typescript
class HttpError extends Error {
  status: number;            // HTTP 상태 코드
  statusText: string;        // HTTP 상태 텍스트
  data?: unknown;            // 에러 응답 데이터
  
  static isHttpError(error: unknown): error is HttpError
}
```

## 내장 인터셉터

### commonInterceptors

자주 사용되는 인터셉터들을 제공합니다:

- `auth(token)`: Authorization 헤더 추가
- `apiKey(key, headerName?)`: API 키 헤더 추가  
- `requestLogger()`: 요청 로깅
- `responseLogger()`: 응답 로깅
- `errorLogger()`: 에러 로깅
- `retry(maxRetries, delay)`: 자동 재시도
- `dataTransformer(transformer)`: 응답 데이터 변환

## 프리셋 함수

### createApiClient(config?)

기본 API 클라이언트를 생성합니다.

```typescript
const client = createApiClient({
  baseURL: '/api',
  timeout: 10000
});
```

### createAuthenticatedClient(token, config?)

인증 토큰이 포함된 클라이언트를 생성합니다.

```typescript
const client = createAuthenticatedClient('jwt-token');
```

### createExternalApiClient(baseURL, apiKey?, config?)

외부 API용 클라이언트를 생성합니다.

```typescript
const client = createExternalApiClient('https://api.example.com', 'api-key');
```

### createFileUploadClient(config?)

파일 업로드용 클라이언트를 생성합니다 (긴 타임아웃).

```typescript
const client = createFileUploadClient();
```

## 마이그레이션 가이드

### axios에서 마이그레이션

기존 axios 코드를 쉽게 마이그레이션할 수 있습니다:

```typescript
// Before (axios)
import axios from 'axios';

const response = await axios.get('/api/users');
const users = response.data;

// After (HTTP Client)
import { createApiClient } from '@/shared/api/http';

const client = createApiClient();
const response = await client.get<User[]>('/api/users');
const users = response.data;
```

## 개발 모드

개발 환경(`NODE_ENV === 'development'`)에서는 자동으로 요청/응답 로깅이 활성화됩니다.

## 주의사항

- 이 모듈은 브라우저 환경에서만 작동합니다 (fetch API 사용)
- Node.js 환경에서 사용하려면 fetch polyfill이 필요할 수 있습니다
- 인터셉터는 순서대로 실행되므로 추가 순서가 중요합니다 