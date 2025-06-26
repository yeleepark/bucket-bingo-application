import { fetchFriendBingos } from '@/shared/api/bingo/service';
import { queryKeys, queryOptions } from '@/shared/api/query/query-client';
import { useQuery } from '@tanstack/react-query';

/**
 * Hook to fetch friend bingo boards
 */
export default function useFriendBingos() {
  return useQuery({
    queryKey: queryKeys.friendBingos(),
    queryFn: fetchFriendBingos,
    ...queryOptions.background,
  });
} 