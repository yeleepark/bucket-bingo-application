import { updateGoal } from '@/shared/api/bingo/service';
import { GoalUpdateDTO } from '@/shared/api/bingo/types';
import { queryKeys } from '@/shared/api/query/query-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/**
 * Hook to update a goal within a bingo board
 */
export default function useUpdateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bingoId, goalData }: { bingoId: string; goalData: GoalUpdateDTO }) =>
      updateGoal(bingoId, goalData),
    onSuccess: (updatedBingo) => {
      // Update cached bingo data
      queryClient.setQueryData(
        queryKeys.bingoDetail(updatedBingo.id),
        updatedBingo
      );
      
      // Invalidate list to reflect progress changes
      queryClient.invalidateQueries({ queryKey: queryKeys.bingos() });
    },
    onError: (error) => {
      console.error('Failed to update goal:', error);
    },
  });
} 