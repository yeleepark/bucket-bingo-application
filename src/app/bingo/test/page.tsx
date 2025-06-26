'use client';

import {
  useCreateBingo,
  useDeleteBingo,
  useFriendBingos,
  useListBingo,
  useUpdateBingo
} from "@/features/bingo/hooks";
import { useState } from "react";

export default function BingoTestPage() {
  const [selectedBingoId, setSelectedBingoId] = useState<string>('');
  
  // Query hooks
  const { data: bingos, isLoading: isBingosLoading, error: bingosError } = useListBingo();
  const { data: friendBingos, isLoading: isFriendBingosLoading } = useFriendBingos();
  
  // Mutation hooks
  const createBingoMutation = useCreateBingo();
  const updateBingoMutation = useUpdateBingo();
  const deleteBingoMutation = useDeleteBingo();

  const handleCreateBingo = () => {
    createBingoMutation.mutate({
      title: '테스트 빙고',
      description: '새로운 빙고 테스트',
      theme: 'test',
      goals: [
        { title: '목표 1', description: '첫 번째 목표' },
        { title: '목표 2', description: '두 번째 목표' }
      ],
      isPublic: true
    });
  };

  const handleUpdateBingo = () => {
    if (selectedBingoId) {
      updateBingoMutation.mutate({
        id: selectedBingoId,
        title: '업데이트된 빙고',
        description: '수정된 설명'
      });
    }
  };

  const handleDeleteBingo = () => {
    if (selectedBingoId) {
      deleteBingoMutation.mutate(selectedBingoId);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">빙고 API 테스트</h1>
      
      {/* Error Display */}
      {bingosError && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {bingosError.message}
        </div>
      )}

      {/* Mutation Status */}
      <div className="mb-6 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Mutation Status:</h3>
        <div className="space-y-1 text-sm">
          <div>Create: {createBingoMutation.isPending ? 'Loading...' : createBingoMutation.isSuccess ? 'Success' : createBingoMutation.isError ? 'Error' : 'Idle'}</div>
          <div>Update: {updateBingoMutation.isPending ? 'Loading...' : updateBingoMutation.isSuccess ? 'Success' : updateBingoMutation.isError ? 'Error' : 'Idle'}</div>
          <div>Delete: {deleteBingoMutation.isPending ? 'Loading...' : deleteBingoMutation.isSuccess ? 'Success' : deleteBingoMutation.isError ? 'Error' : 'Idle'}</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-6 space-x-4">
        <button
          onClick={handleCreateBingo}
          disabled={createBingoMutation.isPending}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          빙고 생성
        </button>
        
        <button
          onClick={handleUpdateBingo}
          disabled={!selectedBingoId || updateBingoMutation.isPending}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          빙고 수정
        </button>
        
        <button
          onClick={handleDeleteBingo}
          disabled={!selectedBingoId || deleteBingoMutation.isPending}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
        >
          빙고 삭제
        </button>
      </div>

      {/* Bingo Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          테스트할 빙고 선택:
        </label>
        <select 
          value={selectedBingoId} 
          onChange={(e) => setSelectedBingoId(e.target.value)}
          className="border rounded px-3 py-2 w-64"
        >
          <option value="">빙고 선택...</option>
          {bingos?.map(bingo => (
            <option key={bingo.id} value={bingo.id}>
              {bingo.title}
            </option>
          ))}
        </select>
      </div>

      {/* Bingo List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">내 빙고 목록</h2>
          {isBingosLoading ? (
            <div>Loading bingos...</div>
          ) : (
            <div className="space-y-3">
              {bingos?.map(bingo => (
                <div key={bingo.id} className="p-4 border border-gray-200 rounded">
                  <h3 className="font-medium">{bingo.title}</h3>
                  <p className="text-sm text-gray-600">{bingo.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      {bingo.theme}
                    </span>
                    <span className="text-sm text-gray-500">
                      {bingo.completedGoals}/{bingo.goals} 완료 ({bingo.progress}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">친구 빙고 목록</h2>
          {isFriendBingosLoading ? (
            <div>Loading friend bingos...</div>
          ) : (
            <div className="space-y-3">
              {friendBingos?.map(bingo => (
                <div key={bingo.id} className="p-4 border border-gray-200 rounded">
                  <div className="flex items-center mb-2">
                    <img 
                      src={bingo.userAvatar} 
                      alt={bingo.userName}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="font-medium">{bingo.userName}</span>
                  </div>
                  <h3 className="font-medium">{bingo.title}</h3>
                  <p className="text-sm text-gray-600">{bingo.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      {bingo.theme}
                    </span>
                    <span className="text-sm text-gray-500">
                      {bingo.progress * 100}% 완료
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 