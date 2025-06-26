import {
    MutationFunction,
    QueryFunction,
    QueryKey,
    useMutation,
    UseMutationOptions,
    useQuery,
    useQueryClient,
    UseQueryOptions,
    UseQueryResult
} from '@tanstack/react-query';
import { createApiClient, HttpError, HttpResponse } from '../http';

// Create API client instance for queries
const apiClient = createApiClient();

/**
 * HTTP query function type
 */
export type HttpQueryFunction<T = unknown> = () => Promise<HttpResponse<T>>;

/**
 * HTTP mutation function type
 */
export type HttpMutationFunction<TData = unknown, TVariables = unknown> = 
  (variables: TVariables) => Promise<HttpResponse<TData>>;

/**
 * Options for useHttpQuery
 */
export interface UseHttpQueryOptions<TData = unknown, TError = HttpError> 
  extends Omit<UseQueryOptions<HttpResponse<TData>, TError, TData>, 'queryKey' | 'queryFn'> {
  queryKey: QueryKey;
  queryFn: HttpQueryFunction<TData>;
}

/**
 * Options for useHttpMutation
 */
export interface UseHttpMutationOptions<TData = unknown, TError = HttpError, TVariables = unknown>
  extends Omit<UseMutationOptions<HttpResponse<TData>, TError, TVariables>, 'mutationFn'> {
  mutationFn: HttpMutationFunction<TData, TVariables>;
}

/**
 * Custom hook for HTTP queries with automatic data extraction
 */
export function useHttpQuery<TData = unknown, TError = HttpError>(
  options: UseHttpQueryOptions<TData, TError>
): UseQueryResult<TData, TError> {
  const { queryKey, queryFn, select, ...restOptions } = options;

  return useQuery({
    queryKey,
    queryFn: queryFn as QueryFunction<HttpResponse<TData>>,
    select: (data: HttpResponse<TData>) => {
      // Apply custom select function if provided, otherwise extract data
      return select ? select(data) : data.data;
    },
    ...restOptions,
  });
}

/**
 * Custom hook for HTTP mutations with automatic data extraction
 * This returns the original mutation result but with transformed callbacks
 */
export function useHttpMutation<TData = unknown, TError = HttpError, TVariables = unknown>(
  options: UseHttpMutationOptions<TData, TError, TVariables>
) {
  const { mutationFn, onSuccess, onError, ...restOptions } = options;

  return useMutation({
    mutationFn: mutationFn as MutationFunction<HttpResponse<TData>, TVariables>,
    onSuccess: (data: HttpResponse<TData>, variables: TVariables, context: unknown) => {
      // Extract data and call original onSuccess
      onSuccess?.(data, variables, context);
    },
    onError: (error: TError, variables: TVariables, context: unknown) => {
      // Call original onError
      onError?.(error, variables, context);
    },
    ...restOptions,
  });
}

/**
 * Helper function to create GET query function
 */
export function createGetQuery<T>(url: string): HttpQueryFunction<T> {
  return () => apiClient.get<T>(url);
}

/**
 * Helper function to create POST mutation function
 */
export function createPostMutation<TData, TVariables = unknown>(
  url: string | ((variables: TVariables) => string)
): HttpMutationFunction<TData, TVariables> {
  return (variables: TVariables) => {
    const endpoint = typeof url === 'function' ? url(variables) : url;
    return apiClient.post<TData>(endpoint, variables);
  };
}

/**
 * Helper function to create PUT mutation function
 */
export function createPutMutation<TData, TVariables = unknown>(
  url: string | ((variables: TVariables) => string)
): HttpMutationFunction<TData, TVariables> {
  return (variables: TVariables) => {
    const endpoint = typeof url === 'function' ? url(variables) : url;
    return apiClient.put<TData>(endpoint, variables);
  };
}

/**
 * Helper function to create PATCH mutation function
 */
export function createPatchMutation<TData, TVariables = unknown>(
  url: string | ((variables: TVariables) => string)
): HttpMutationFunction<TData, TVariables> {
  return (variables: TVariables) => {
    const endpoint = typeof url === 'function' ? url(variables) : url;
    return apiClient.patch<TData>(endpoint, variables);
  };
}

/**
 * Helper function to create DELETE mutation function
 */
export function createDeleteMutation<TData = { success: boolean }, TVariables = string>(
  url: string | ((variables: TVariables) => string)
): HttpMutationFunction<TData, TVariables> {
  return (variables: TVariables) => {
    const endpoint = typeof url === 'function' ? url(variables) : url;
    return apiClient.delete<TData>(endpoint);
  };
}

/**
 * Hook to invalidate queries
 */
export function useInvalidateQueries() {
  const queryClient = useQueryClient();

  return {
    /**
     * Invalidate all queries
     */
    invalidateAll: () => queryClient.invalidateQueries(),
    
    /**
     * Invalidate queries by key
     */
    invalidateByKey: (queryKey: QueryKey) => 
      queryClient.invalidateQueries({ queryKey }),
    
    /**
     * Invalidate queries by predicate
     */
    invalidateByPredicate: (predicate: (query: unknown) => boolean) =>
      queryClient.invalidateQueries({ predicate }),
    
    /**
     * Remove queries by key
     */
    removeByKey: (queryKey: QueryKey) =>
      queryClient.removeQueries({ queryKey }),
    
    /**
     * Reset queries by key
     */
    resetByKey: (queryKey: QueryKey) =>
      queryClient.resetQueries({ queryKey }),
  };
}

/**
 * Hook for optimistic updates
 */
export function useOptimisticUpdate<TData>(queryKey: QueryKey) {
  const queryClient = useQueryClient();

  return {
    /**
     * Set optimistic data
     */
    setOptimistic: (updater: (old: TData | undefined) => TData) => {
      queryClient.setQueryData(queryKey, updater);
    },
    
    /**
     * Cancel ongoing queries
     */
    cancelQueries: () => queryClient.cancelQueries({ queryKey }),
    
    /**
     * Get current data
     */
    getCurrentData: (): TData | undefined => queryClient.getQueryData(queryKey),
    
    /**
     * Rollback to previous data
     */
    rollback: (previousData: TData) => {
      queryClient.setQueryData(queryKey, previousData);
    },
  };
} 