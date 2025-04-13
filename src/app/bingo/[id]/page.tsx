"use client";

import { useEffect, useState } from 'react';
import { PageLayout } from '@/widgets';
import { fetchBingoById, updateGoal } from '@/shared/api/bingo/service';
import { BingoDTO } from '@/shared/api/bingo/types';
import { Badge, CheckIcon } from '@/shared/ui';

export default function BingoDetailPage({ params }: { params: { id: string } }) {
  const [bingo, setBingo] = useState<BingoDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBingo() {
      try {
        setIsLoading(true);
        const data = await fetchBingoById(params.id);
        setBingo(data);
        setError(null);
      } catch (err) {
        console.error('Error loading bingo:', err);
        setError('Failed to load bingo board. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    loadBingo();
  }, [params.id]);

  const handleGoalToggle = async (goalId: string, completed: boolean) => {
    if (!bingo) return;

    try {
      const updatedBingo = await updateGoal(bingo.id, {
        id: goalId,
        completed: !completed,
      });

      setBingo(updatedBingo);
    } catch (err) {
      console.error('Error updating goal:', err);
      // Show error toast or message
    }
  };

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">Loading...</div>
        </div>
      </PageLayout>
    );
  }

  if (error || !bingo) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20 text-red-500">
            {error || 'Bingo board not found'}
          </div>
        </div>
      </PageLayout>
    );
  }

  // Calculate completion statistics
  const completedGoals = bingo.goals.filter(goal => goal.completed).length;
  const completionPercentage = Math.round((completedGoals / bingo.goals.length) * 100);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-bold">{bingo.title}</h1>
              <Badge variant={bingo.isPublic ? 'info' : 'default'}>
                {bingo.isPublic ? '공개' : '비공개'}
              </Badge>
            </div>
            <p className="text-gray-600">{bingo.description}</p>
          </div>

          <div className="mt-4 md:mt-0 flex flex-col items-end">
            <div className="text-lg font-medium">
              진행률: {completionPercentage}%
            </div>
            <div className="text-sm text-gray-600">
              {completedGoals}/{bingo.goals.length} 완료
            </div>
          </div>
        </div>

        {/* Bingo Board */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="grid grid-cols-5 gap-px bg-gray-200">
            {bingo.goals.map((goal) => (
              <div
                key={goal.id}
                onClick={() => handleGoalToggle(goal.id, goal.completed)}
                className={`
                  aspect-square p-3 cursor-pointer transition-colors duration-150
                  flex flex-col items-center justify-center text-center
                  ${goal.completed ? 'bg-green-50' : 'bg-white hover:bg-gray-50'}
                `}
              >
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-sm font-medium break-words">
                    {goal.title}
                  </p>
                </div>

                {goal.completed && (
                  <div className="mt-2">
                    <CheckIcon
                      size={16}
                      className={goal.verified ? 'text-green-600' : 'text-amber-500'}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CheckIcon size={14} className="text-green-600" />
            <span>완료 및 인증됨</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckIcon size={14} className="text-amber-500" />
            <span>완료됨 (인증 대기중)</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
