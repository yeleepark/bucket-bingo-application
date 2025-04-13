import Link from "next/link";

export default function CreateBingoPage() {
  return (
    <div className="flex flex-col min-h-screen p-6 max-w-4xl mx-auto">
      {/* Header */}
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-indigo-600 font-bold text-2xl">연간 빙고</Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-8">
        <h1 className="text-2xl font-bold mb-8">새 빙고판 만들기</h1>

        <form className="space-y-8">
          {/* Bingo Info */}
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                빙고 제목
              </label>
              <input
                type="text"
                id="title"
                placeholder="빙고 제목을 입력하세요 (예: 2024년 목표 빙고)"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                설명 (선택사항)
              </label>
              <textarea
                id="description"
                rows={3}
                placeholder="빙고에 대한 간단한 설명을 적어주세요"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              ></textarea>
            </div>

            <div className="flex gap-4">
              <div className="w-1/2">
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                  시작일
                </label>
                <input
                  type="date"
                  id="startDate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                  종료일 (선택사항)
                </label>
                <input
                  type="date"
                  id="endDate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
          </div>

          {/* Goal Template Selection */}
          <div>
            <h2 className="text-lg font-medium mb-4">빙고 템플릿 선택 (선택사항)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 cursor-pointer">
                <h3 className="font-medium mb-2">비어있는 빙고판</h3>
                <p className="text-sm text-gray-600">직접 모든 목표를 설정합니다</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 cursor-pointer">
                <h3 className="font-medium mb-2">건강 목표 빙고</h3>
                <p className="text-sm text-gray-600">운동, 식습관 등 건강 관련 목표</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-500 cursor-pointer">
                <h3 className="font-medium mb-2">자기계발 빙고</h3>
                <p className="text-sm text-gray-600">독서, 학습, 자격증 등의 목표</p>
              </div>
            </div>
          </div>

          {/* Goals Section */}
          <div>
            <h2 className="text-lg font-medium mb-4">목표 설정</h2>
            <p className="text-sm text-gray-600 mb-4">
              빙고판에 넣을 목표를 설정해주세요. 최대 100개까지 설정할 수 있으며, 나중에 수정 가능합니다.
            </p>

            <div className="space-y-4">
              {/* First 5 goals shown, rest can be added */}
              {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className="flex gap-2">
                  <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 text-indigo-600 font-medium rounded-lg">
                    {num}
                  </div>
                  <input
                    type="text"
                    placeholder={`목표 ${num}을 입력하세요`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              ))}

              <button type="button" className="flex items-center gap-2 text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <span>목표 추가하기</span>
              </button>
            </div>
          </div>

          {/* Friend Verification Option */}
          <div className="p-6 bg-gray-50 rounded-lg">
            <div className="flex items-start mb-4">
              <div className="flex items-center h-5">
                <input
                  id="friendVerification"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 rounded"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="friendVerification" className="font-medium">친구 인증 활성화</label>
                <p className="text-sm text-gray-600">
                  친구가 목표 완료를 승인해야 빙고판에 체크할 수 있습니다
                </p>
              </div>
            </div>

            <div className="ml-7">
              <label htmlFor="friendEmail" className="block text-sm font-medium text-gray-700 mb-1">
                친구 이메일 (선택사항)
              </label>
              <input
                type="email"
                id="friendEmail"
                placeholder="친구의 이메일을 입력하세요"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4">
            <Link
              href="/"
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              취소
            </Link>
            <Link
              href="/bingo"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              빙고판 생성하기
            </Link>
          </div>
        </form>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 border-t border-gray-200">
        <p className="text-center text-xs text-gray-400">© 2024 연간 빙고. All rights reserved.</p>
      </footer>
    </div>
  );
}
