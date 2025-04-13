import Image from "next/image";
import Link from "next/link";

export default function BingoPage() {
  // Mock data for bingo cells
  const mockCells = Array(100).fill(null).map((_, index) => ({
    id: index + 1,
    goal: `목표 ${index + 1}`,
    completed: Math.random() > 0.7, // Randomly mark some as completed
  }));

  return (
    <div className="flex flex-col min-h-screen p-6 max-w-6xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-indigo-600 font-bold text-2xl">연간 빙고</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/bingo/detail" className="flex items-center gap-2 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            자세히 보기
          </Link>
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
            목표 저장
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Bingo Title */}
        <div className="flex items-center justify-between my-8">
          <h1 className="text-2xl font-bold">2024년 목표 빙고</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <span>달성률: 35%</span>
            <span>|</span>
            <span>35/100 완료</span>
          </div>
        </div>

        {/* Bingo Board */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="grid grid-cols-10 gap-px bg-gray-200">
            {mockCells.map((cell) => (
              <div
                key={cell.id}
                className={`
                  aspect-square flex flex-col items-center justify-center p-2 cursor-pointer
                  ${cell.completed ? 'bg-green-100 text-green-800' : 'bg-white hover:bg-gray-50'}
                  transition-colors duration-150
                `}
              >
                <div className="text-xs sm:text-sm font-medium text-center break-words w-full">
                  {cell.goal}
                </div>
                {cell.completed && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 text-green-600">
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bingo Stats */}
        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-lg font-semibold mb-4">빙고 현황</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-md font-medium mb-2">달성한 빙고 라인</h3>
              <div className="flex items-center gap-1 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
                <span>총 3줄의 빙고를 완성했습니다!</span>
              </div>
            </div>
            <div>
              <h3 className="text-md font-medium mb-2">최근 달성한 목표</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-20 text-gray-500">2024.05.15</span>
                  <span>아침 운동 30분 하기</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-20 text-gray-500">2024.05.12</span>
                  <span>책 1권 읽기</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-20 text-gray-500">2024.05.10</span>
                  <span>새로운 요리 도전하기</span>
                </li>
              </ul>
              <Link
                href="/bingo/detail"
                className="inline-flex items-center gap-1 text-indigo-600 mt-2 text-sm"
              >
                <span>더 보기</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-500">
          <Link href="#" className="hover:text-gray-700">서비스 소개</Link>
          <Link href="#" className="hover:text-gray-700">이용약관</Link>
          <Link href="#" className="hover:text-gray-700">개인정보처리방침</Link>
          <Link href="#" className="hover:text-gray-700">고객센터</Link>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">© 2024 연간 빙고. All rights reserved.</p>
      </footer>
    </div>
  );
}
