import Link from "next/link";

export default function BingoDetailPage() {
  // Mock data for completed goals
  const completedGoals = [
    { id: 1, goal: "아침 운동 30분 하기", date: "2024.05.15", verified: true },
    { id: 2, goal: "책 1권 읽기", date: "2024.05.12", verified: true },
    { id: 3, goal: "새로운 요리 도전하기", date: "2024.05.10", verified: true },
    { id: 4, goal: "블로그 글 작성하기", date: "2024.05.05", verified: false },
    { id: 5, goal: "주말 등산 가기", date: "2024.04.28", verified: true },
    { id: 6, goal: "물 2L 마시기", date: "2024.04.25", verified: false },
    { id: 7, goal: "친구와 통화하기", date: "2024.04.20", verified: true },
    { id: 8, goal: "집 청소하기", date: "2024.04.15", verified: true },
    { id: 9, goal: "새로운 언어 공부하기", date: "2024.04.10", verified: true },
    { id: 10, goal: "영화 보기", date: "2024.04.05", verified: false },
  ];

  // Mock bingo statistics
  const bingoStats = {
    totalCompleted: 35,
    totalGoals: 100,
    completionRate: 35,
    bingoLines: 3,
    avgCompletionPerMonth: 8.75,
    startDate: "2024.01.01",
    mostProductiveMonth: "3월",
  };

  return (
    <div className="flex flex-col min-h-screen p-6 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-indigo-600 font-bold text-2xl">연간 빙고</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/bingo"
            className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="3" y1="9" x2="21" y2="9"></line>
              <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>
            빙고판으로 돌아가기
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Bingo Title */}
        <div className="my-8">
          <h1 className="text-2xl font-bold mb-2">2024년 목표 빙고 - 상세 정보</h1>
          <div className="flex items-center text-gray-600">
            <span>시작일: {bingoStats.startDate}</span>
            <span className="mx-2">|</span>
            <span>달성률: {bingoStats.completionRate}%</span>
          </div>
        </div>

        {/* Bingo Success Banner */}
        <div className="bg-indigo-600 text-white rounded-xl p-6 mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1">축하합니다! 🎉</h2>
            <p>총 {bingoStats.bingoLines}줄의 빙고를 완성했습니다.</p>
          </div>
          <div className="text-4xl font-bold">{bingoStats.bingoLines}</div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Completed Goals List */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold mb-4">달성한 목표</h2>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 px-6 py-3 bg-gray-50 font-medium text-gray-600 border-b border-gray-200">
                <div>상태</div>
                <div>목표</div>
                <div>달성일</div>
              </div>
              <div className="divide-y divide-gray-200">
                {completedGoals.map((goal) => (
                  <div key={goal.id} className="grid grid-cols-[auto_1fr_auto] gap-4 px-6 py-4 items-center">
                    <div>
                      {goal.verified ? (
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                            <path d="M20 6 9 17l-5-5"></path>
                          </svg>
                        </div>
                      ) : (
                        <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="font-medium">{goal.goal}</div>
                    <div className="text-gray-500">{goal.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="lg:col-span-1">
            <h2 className="text-lg font-semibold mb-4">빙고 통계</h2>
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
              <div>
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>달성률</span>
                  <span>{bingoStats.completionRate}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${bingoStats.completionRate}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500">완료한 목표</div>
                  <div className="text-lg font-bold">{bingoStats.totalCompleted}/{bingoStats.totalGoals}</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500">완성한 빙고</div>
                  <div className="text-lg font-bold">{bingoStats.bingoLines}줄</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500">월 평균 달성</div>
                  <div className="text-lg font-bold">{bingoStats.avgCompletionPerMonth}개</div>
                </div>
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="text-xs text-gray-500">가장 활발한 달</div>
                  <div className="text-lg font-bold">{bingoStats.mostProductiveMonth}</div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">월별 달성 추이</h3>
                <div className="grid grid-cols-6 gap-1 text-xs">
                  <div className="text-gray-500">1월</div>
                  <div className="text-gray-500">2월</div>
                  <div className="text-gray-500">3월</div>
                  <div className="text-gray-500">4월</div>
                  <div className="text-gray-500">5월</div>
                  <div className="text-gray-500">6월</div>
                </div>
                <div className="grid grid-cols-6 gap-1 h-24 mt-1">
                  <div className="bg-indigo-100 rounded-md relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-indigo-500" style={{ height: '15%' }}></div>
                  </div>
                  <div className="bg-indigo-100 rounded-md relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-indigo-500" style={{ height: '35%' }}></div>
                  </div>
                  <div className="bg-indigo-100 rounded-md relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-indigo-500" style={{ height: '60%' }}></div>
                  </div>
                  <div className="bg-indigo-100 rounded-md relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-indigo-500" style={{ height: '40%' }}></div>
                  </div>
                  <div className="bg-indigo-100 rounded-md relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-indigo-500" style={{ height: '25%' }}></div>
                  </div>
                  <div className="bg-indigo-100 rounded-md relative overflow-hidden">
                    <div className="absolute bottom-0 w-full bg-indigo-500" style={{ height: '0%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-gray-200">
        <p className="text-center text-xs text-gray-400">© 2024 연간 빙고. All rights reserved.</p>
      </footer>
    </div>
  );
}
