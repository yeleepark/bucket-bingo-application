import { verifyGoal } from '@/shared/api/bingo/service';
import { queryKeys } from '@/shared/api/query/query-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Hook to verify a completed goal
 */
export default function useVerifyGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bingoId, goalId }: { bingoId: string; goalId: string }) =>
      verifyGoal(bingoId, goalId),
    onSuccess: (updatedBingo) => {
      // Update cached bingo data
      queryClient.setQueryData(
        queryKeys.bingoDetail(updatedBingo.id),
        updatedBingo
      );
      
      // Invalidate list and friends list to reflect changes
      queryClient.invalidateQueries({ queryKey: queryKeys.bingos() });
      queryClient.invalidateQueries({ queryKey: queryKeys.friendBingos() });
    },
    onError: (error) => {
      console.error('Failed to verify goal:', error);
    },
  });
} 