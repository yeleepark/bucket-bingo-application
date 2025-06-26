import { fetchBingos } from '@/shared/api/bingo/service';
import { queryKeys, queryOptions } from '@/shared/api/query/query-client';
import { useQuery } from '@tanstack/react-query';

/**
 * Hook to fetch all bingo boards
 */
export default function useListBingo() {
  return useQuery({
    queryKey: queryKeys.bingos(),
    queryFn: fetchBingos,
    ...queryOptions.user,
  });
} 