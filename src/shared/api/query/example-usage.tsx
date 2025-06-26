/**
 * React Query 통합 모듈 사용 예제
 * 
 * 이 파일은 실제 컴포넌트에서 어떻게 사용하는지 보여주는 예제입니다.
 * 실제 프로젝트에서는 이 파일을 삭제하거나 참고용으로만 사용하세요.
 */

'use client';

import {
    useCreateBingo,
    useGetBingo,
    useListBingo,
    useOptimisticGoalUpdate,
    useUpdateGoal
} from '@/features/bingo/hooks';
import { BingoCreateDTO, BingoListItemDTO } from '@/shared/api/bingo/types';
import { useState } from 'react';

/**
 * 빙고 목록 페이지 예제
 */
export function BingoListExample() {
  const { data: bingos, isLoading, error, refetch } = useListBingo();

  if (isLoading) {
    return <div className="p-4">빙고 목록을 불러오는 중...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-600">
        <p>빙고 목록을 불러오는데 실패했습니다.</p>
        <p className="text-sm">{error.message}</p>
        <button 
          onClick={() => refetch()}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          다시 시도
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">내 빙고 목록</h1>
      <div className="grid gap-4">
        {bingos?.map((bingo: BingoListItemDTO) => (
          <div key={bingo.id} className="border rounded-lg p-4">
            <h3 className="font-semibold">{bingo.title}</h3>
            <p className="text-gray-600">
              진행률: {bingo.progress}% ({bingo.completedGoals}/{bingo.goals})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * 빙고 상세 페이지 예제
 */
export function BingoDetailExample({ bingoId }: { bingoId: string }) {
  const { data: bingo, isLoading, error } = useGetBingo(bingoId);
  const updateGoal = useUpdateGoal();
  const optimistic = useOptimisticGoalUpdate(bingoId);

  const handleGoalToggle = async (goalId: string, currentCompleted: boolean) => {
    // 낙관적 업데이트로 즉시 UI 변경
    const rollback = optimistic.updateGoalOptimistically(goalId, {
      completed: !currentCompleted
    });

    try {
      await updateGoal.mutateAsync({
        bingoId,
        goalData: { id: goalId, completed: !currentCompleted }
      });
    } catch (error) {
      // 실패 시 롤백
      rollback();
      console.error('목표 업데이트 실패:', error);
    }
  };

  if (isLoading) {
    return <div className="p-4">빙고 정보를 불러오는 중...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">빙고를 불러올 수 없습니다.</div>;
  }

  if (!bingo) {
    return <div className="p-4">빙고를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{bingo.title}</h1>
      <p className="text-gray-600 mb-6">{bingo.description}</p>
      
      <div className="grid grid-cols-5 gap-2 mb-6">
        {bingo.goals.map((goal) => (
          <div
            key={goal.id}
            className={`
              aspect-square border-2 rounded-lg p-2 text-sm cursor-pointer
              transition-colors duration-200
              ${goal.completed 
                ? 'bg-green-100 border-green-500 text-green-800' 
                : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
              }
            `}
            onClick={() => handleGoalToggle(goal.id, goal.completed)}
          >
            <div className="flex items-center justify-center h-full text-center">
              {goal.title}
            </div>
          </div>
        ))}
      </div>

      <div className="text-sm text-gray-600">
        <p>진행률: {bingo.progress}%</p>
        <p>완료된 목표: {bingo.completedGoals}/{bingo.goals}</p>
      </div>
    </div>
  );
}

/**
 * 빙고 생성 폼 예제
 */
export function CreateBingoExample() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const createBingo = useCreateBingo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const bingoData: BingoCreateDTO = {
      title: title.trim(),
      description: description.trim(),
      
      goals: Array.from({ length: 25 }, (_, i) => ({
        id: `goal-${i}`,
        title: `목표 ${i + 1}`,
        completed: false,
        position: i
      }))
    };

    try {
      const newBingo = await createBingo.mutateAsync(bingoData);
      console.log('새 빙고 생성:', newBingo);
      
      // 폼 초기화
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('빙고 생성 실패:', error);
    }
  };

  return (
    <div className="p-4 max-w-md">
      <h2 className="text-xl font-bold mb-4">새 빙고 만들기</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            제목
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="빙고 제목을 입력하세요"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            설명
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="빙고 설명을 입력하세요"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={createBingo.isPending || !title.trim()}
          className={`
            w-full py-2 px-4 rounded-md font-medium
            ${createBingo.isPending || !title.trim()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
            }
          `}
        >
          {createBingo.isPending ? '생성 중...' : '빙고 만들기'}
        </button>
      </form>

      {createBingo.isError && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          빙고 생성에 실패했습니다. 다시 시도해주세요.
        </div>
      )}
    </div>
  );
}

/**
 * 전체 사용 예제를 보여주는 컴포넌트
 */
export function QueryIntegrationExample() {
  const [currentView, setCurrentView] = useState<'list' | 'detail' | 'create'>('list');
  const [selectedBingoId, setSelectedBingoId] = useState<string>('');

  const renderContent = () => {
    switch (currentView) {
      case 'list':
        return <BingoListExample />;
      case 'detail':
        return selectedBingoId ? (
          <BingoDetailExample bingoId={selectedBingoId} />
        ) : (
          <div>빙고 ID를 선택해주세요.</div>
        );
      case 'create':
        return <CreateBingoExample />;
      default:
        return <BingoListExample />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-4 py-4">
            <button
              onClick={() => setCurrentView('list')}
              className={`px-4 py-2 rounded-md ${
                currentView === 'list' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              목록
            </button>
            <button
              onClick={() => setCurrentView('detail')}
              className={`px-4 py-2 rounded-md ${
                currentView === 'detail' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              상세
            </button>
            <button
              onClick={() => setCurrentView('create')}
              className={`px-4 py-2 rounded-md ${
                currentView === 'create' 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              생성
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
} 