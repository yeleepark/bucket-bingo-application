'use client';

import { useListBingo } from "@/features/bingo/hooks";
import {
  BingoBoard,
  BingoHeader,
  BingoList,
  Button,
  CheckIcon,
  ChevronRightIcon,
  Container,
  EditIcon,
  Footer,
  Header,
  LinkButton,
  LoadingSpinner,
  SearchIcon,
  Section,
  ThemeToggle
} from "@/shared/ui";
import { useEffect } from "react";

export default function BingoPage() {
  const { data: bingos, isLoading, error } = useListBingo();

  // 디버깅을 위한 상태 로깅
  useEffect(() => {
    console.log('BingoPage - 상태 변경:', {
      isLoading,
      error: error?.message || error,
      bingosCount: bingos?.length || 0,
      bingos
    });
  }, [bingos, isLoading, error]);

  // Mock data for bingo board cells
  const mockCells = Array(100).fill(null).map((_, index) => ({
    id: index + 1,
    goal: `목표 ${index + 1}`,
    completed: Math.random() > 0.7,
  }));

  if (isLoading) {
    return (
      <LoadingSpinner 
        message="빙고 데이터를 불러오는 중..."
        submessage="MSW Mock 서버 응답 대기 중"
      />
    );
  }

  if (error) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <p className="text-red-600 dark:text-red-400 mb-4 text-lg font-medium">
              빙고 데이터를 불러오는데 실패했습니다
            </p>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
              {error.message}
            </p>
            <Button onClick={() => window.location.reload()} variant="primary">
              다시 시도
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  const currentBingo = bingos?.[0];

  return (
    <Container>
      <Header 
        actions={
          <>
            <ThemeToggle />
            <LinkButton 
              href="/bingo/detail" 
              variant="ghost"
              icon={<SearchIcon />}
            >
              자세히 보기
            </LinkButton>
            <Button 
              variant="primary"
              icon={<EditIcon />}
            >
              목표 저장
            </Button>
          </>
        }
      />

      <main className="flex-1">
        <BingoHeader
          title={currentBingo ? currentBingo.title : "2024년 목표 빙고"}
          progress={currentBingo?.progress}
          completed={currentBingo?.completedGoals}
          total={currentBingo?.goals}
        />

        <BingoBoard 
          cells={mockCells}
          onCellClick={(cell) => console.log('Cell clicked:', cell)}
        />

        {bingos && bingos.length > 0 && (
          <Section 
            title="내 빙고 목록" 
            variant="card"
            className="mt-8"
          >
            <BingoList 
              bingos={bingos}
              onBingoClick={(bingo) => console.log('Bingo clicked:', bingo)}
            />
          </Section>
        )}

        <Section 
          title="빙고 현황" 
          variant="bordered"
          className="mt-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium mb-2 text-gray-900 dark:text-white">
                달성한 빙고 라인
              </h3>
              <div className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
                <CheckIcon className="w-5 h-5" />
                <span>총 3줄의 빙고를 완성했습니다!</span>
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium mb-2 text-gray-900 dark:text-white">
                최근 달성한 목표
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-20 text-gray-500 dark:text-gray-400">2024.05.15</span>
                  <span className="text-gray-900 dark:text-gray-100">아침 운동 30분 하기</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-20 text-gray-500 dark:text-gray-400">2024.05.12</span>
                  <span className="text-gray-900 dark:text-gray-100">책 1권 읽기</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-20 text-gray-500 dark:text-gray-400">2024.05.10</span>
                  <span className="text-gray-900 dark:text-gray-100">새로운 요리 도전하기</span>
                </li>
              </ul>
              <LinkButton
                href="/bingo/detail"
                variant="ghost"
                size="sm"
                icon={<ChevronRightIcon />}
                className="mt-2"
              >
                더 보기
              </LinkButton>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </Container>
  );
}
