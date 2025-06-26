import { createBingo } from '@/shared/api/bingo/service';
import { queryKeys } from '@/shared/api/query/query-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Hook to create a new bingo board
 */
export default function useCreateBingo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBingo,
    onSuccess: (newBingo) => {
      // Invalidate and refetch bingo list
      queryClient.invalidateQueries({ queryKey: queryKeys.bingos() });
      
      // Add new bingo to cache
      queryClient.setQueryData(
        queryKeys.bingoDetail(newBingo.id), 
        newBingo
      );
    },
    onError: (error) => {
      console.error('Failed to create bingo:', error);
    },
  });
} 