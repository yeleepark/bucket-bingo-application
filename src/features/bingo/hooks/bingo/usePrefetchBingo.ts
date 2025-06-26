import { fetchBingoById, fetchBingos } from '@/shared/api/bingo/service';
import { queryKeys, queryOptions } from '@/shared/api/query/query-client';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Hook to prefetch bingo data
 */
export default function usePrefetchBingo() {
  const queryClient = useQueryClient();

  return {
    prefetchBingo: (id: string) => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.bingoDetail(id),
        queryFn: () => fetchBingoById(id),
        staleTime: queryOptions.user.staleTime,
      });
    },
    
    prefetchBingoList: () => {
      queryClient.prefetchQuery({
        queryKey: queryKeys.bingos(),
        queryFn: fetchBingos,
        staleTime: queryOptions.user.staleTime,
      });
    },
  };
} 