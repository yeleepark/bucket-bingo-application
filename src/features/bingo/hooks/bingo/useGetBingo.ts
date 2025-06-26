import { fetchBingoById } from '@/shared/api/bingo/service';
import { queryKeys, queryOptions } from '@/shared/api/query/query-client';
import { useQuery } from '@tanstack/react-query';

/**
 * Hook to fetch a single bingo board
 */
export default function useGetBingo(id: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: queryKeys.bingoDetail(id),
    queryFn: () => fetchBingoById(id),
    enabled: options?.enabled !== false && !!id,
    ...queryOptions.user,
  });
} 