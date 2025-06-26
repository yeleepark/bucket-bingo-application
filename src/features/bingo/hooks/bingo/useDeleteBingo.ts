import { deleteBingo } from '@/shared/api/bingo/service';
import { queryKeys } from '@/shared/api/query/query-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Hook to delete a bingo board
 */
export default function useDeleteBingo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBingo,
    onSuccess: (_, deletedId) => {
      // Remove from cache
      queryClient.removeQueries({ 
        queryKey: queryKeys.bingoDetail(deletedId) 
      });
      
      // Invalidate list
      queryClient.invalidateQueries({ queryKey: queryKeys.bingos() });
    },
    onError: (error) => {
      console.error('Failed to delete bingo:', error);
    },
  });
} 