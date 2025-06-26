import { DefaultOptions, QueryClient } from '@tanstack/react-query';
import { HttpError } from '../http';

/**
 * Default query options for React Query
 */
const defaultQueryOptions: DefaultOptions = {
  queries: {
    // 5분 동안 데이터를 fresh로 유지
    staleTime: 5 * 60 * 1000,
    // 30분 동안 캐시 유지
    gcTime: 30 * 60 * 1000,
    // 에러 발생 시 재시도 설정
    retry: (failureCount: number, error: Error) => {
      // HTTP 4xx 에러는 재시도하지 않음
      if (HttpError.isHttpError(error) && error.status >= 400 && error.status < 500) {
        return false;
      }
      // 최대 3회까지 재시도
      return failureCount < 3;
    },
    // 재시도 간격 (지수 백오프)
    retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // 브라우저 포커스 시 refetch 비활성화 (필요시 개별 설정)
    refetchOnWindowFocus: false,
    // 네트워크 재연결 시 refetch
    refetchOnReconnect: true,
  },
  mutations: {
    // 뮤테이션 에러 재시도 설정
    retry: (failureCount: number, error: Error) => {
      // 4xx 에러는 재시도하지 않음
      if (HttpError.isHttpError(error) && error.status >= 400 && error.status < 500) {
        return false;
      }
      // 최대 1회 재시도
      return failureCount < 1;
    },
    // 뮤테이션 재시도 간격
    retryDelay: 1000,
  },
};

/**
 * Create configured QueryClient instance
 */
export function createQueryClient(options?: Partial<DefaultOptions>): QueryClient {
  return new QueryClient({
    defaultOptions: {
      ...defaultQueryOptions,
      ...options,
    },
  });
}

/**
 * Default QueryClient instance
 */
export const queryClient = createQueryClient();

/**
 * Query key factory for consistent cache keys
 */
export const queryKeys = {
  // Base keys
  all: ['api'] as const,
  
  // Bingo keys
  bingo: () => [...queryKeys.all, 'bingo'] as const,
  bingos: (filters?: Record<string, unknown>) => 
    [...queryKeys.bingo(), 'list', filters] as const,
  bingoDetail: (id: string) => 
    [...queryKeys.bingo(), 'detail', id] as const,
  friendBingos: () => 
    [...queryKeys.bingo(), 'friends'] as const,
  
  // User keys
  user: () => [...queryKeys.all, 'user'] as const,
  userProfile: () => [...queryKeys.user(), 'profile'] as const,
  
  // Auth keys
  auth: () => [...queryKeys.all, 'auth'] as const,
  authStatus: () => [...queryKeys.auth(), 'status'] as const,
} as const;

/**
 * Common query options
 */
export const queryOptions = {
  /**
   * Real-time data that should be frequently updated
   */
  realtime: {
    staleTime: 0,
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // 30 seconds
  },
  
  /**
   * Static data that rarely changes
   */
  static: {
    staleTime: 60 * 60 * 1000, // 1 hour
    gcTime: 24 * 60 * 60 * 1000, // 24 hours
  },
  
  /**
   * User-specific data
   */
  user: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  },
  
  /**
   * Background data that can be slightly stale
   */
  background: {
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 60 * 60 * 1000, // 1 hour
    refetchOnWindowFocus: false,
  },
} as const; 