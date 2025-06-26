import { BingoDTO, GoalUpdateDTO } from '@/shared/api/bingo/types';
import { queryKeys } from '@/shared/api/query/query-client';
import { useQueryClient } from '@tanstack/react-query';

/**
 * Hook for optimistic goal updates
 */
export default function useOptimisticGoalUpdate(bingoId: string) {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.bingoDetail(bingoId);

  return {
    updateGoalOptimistically: (goalId: string, updates: Partial<GoalUpdateDTO>) => {
      // Cancel ongoing queries
      queryClient.cancelQueries({ queryKey });

      // Get current data
      const previousData = queryClient.getQueryData<BingoDTO>(queryKey);

      // Optimistically update
      if (previousData) {
        const updatedBingo = {
          ...previousData,
          goals: previousData.goals.map(goal =>
            goal.id === goalId ? { ...goal, ...updates } : goal
          ),
        };
        
        queryClient.setQueryData(queryKey, updatedBingo);
      }

      // Return rollback function
      return () => {
        if (previousData) {
          queryClient.setQueryData(queryKey, previousData);
        }
      };
    },
  };
} 