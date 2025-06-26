import { updateBingo } from '@/shared/api/bingo/service';
import { queryKeys } from '@/shared/api/query/query-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Hook to update a bingo board
 */
export default function useUpdateBingo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBingo,
    onSuccess: (updatedBingo) => {
      // Update cached data
      queryClient.setQueryData(
        queryKeys.bingoDetail(updatedBingo.id), 
        updatedBingo
      );
      
      // Invalidate list to reflect changes
      queryClient.invalidateQueries({ queryKey: queryKeys.bingos() });
    },
    onError: (error) => {
      console.error('Failed to update bingo:', error);
    },
  });
} 