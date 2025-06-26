# React Query Integration Module

TanStack React Query와 HTTP 클라이언트를 통합한 도메인별 커스텀 훅 시스템입니다. 비즈니스 로직에서 `useQuery`를 직접 사용하지 않고 도메인별 커스텀 훅을 사용할 수 있습니다.

## 주요 특징

- 🔄 **도메인별 커스텀 훅**: useListBingo, useGetBingo 등 도메인 중심의 API
- 🚀 **자동 캐시 관리**: 최적화된 캐시 정책과 자동 무효화
- 🔒 **타입 안전성**: 완전한 TypeScript 지원
- ⚡ **낙관적 업데이트**: 즉각적인 UI 반응
- 🔁 **자동 재시도**: 네트워크 오류 시 자동 재시도
- 📡 **실시간 동기화**: 데이터 변경 시 자동 동기화

## 설치 및 설정

### 1. Provider 설정

```tsx
// src/app/layout.tsx
import { QueryProvider } from '@/shared/api/query';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
```

### 2. 기본 사용법

```tsx
// 컴포넌트에서 도메인 훅 사용
import { useListBingo, useGetBingo } from '@/features/bingo/hooks';

function BingoListPage() {
  // 빙고 목록 조회
  const { data: bingos, isLoading, error } = useListBingo();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div>
      {bingos?.map(bingo => (
        <BingoCard key={bingo.id} bingo={bingo} />
      ))}
    </div>
  );
}

function BingoDetailPage({ id }: { id: string }) {
  // 특정 빙고 조회
  const { data: bingo, isLoading } = useGetBingo(id);

  if (isLoading) return <div>로딩 중...</div>;

  return <BingoDetail bingo={bingo} />;
}
```

## 도메인별 커스텀 훅

### Bingo 도메인 훅

```tsx
import {
  useListBingo,        // 빙고 목록 조회
  useGetBingo,         // 특정 빙고 조회
  useFriendBingos,     // 친구 빙고 목록 조회
  useCreateBingo,      // 빙고 생성
  useUpdateBingo,      // 빙고 수정
  useDeleteBingo,      // 빙고 삭제
  useUpdateGoal,       // 목표 업데이트
  useVerifyGoal,       // 목표 검증
  useOptimisticGoalUpdate, // 낙관적 업데이트
  usePrefetchBingo,    // 사전 로딩
} from '@/features/bingo/hooks';
```

### 쿼리 훅 사용 예제

#### 1. 데이터 조회

```tsx
function BingoList() {
  const { 
    data: bingos, 
    isLoading, 
    error, 
    refetch 
  } = useListBingo();

  // 조건부 조회
  const { data: bingo } = useGetBingo(bingoId, { 
    enabled: !!bingoId 
  });

  return (
    <div>
      {/* UI 렌더링 */}
    </div>
  );
}
```

#### 2. 데이터 생성

```tsx
function CreateBingoForm() {
  const createBingo = useCreateBingo();

  const handleSubmit = async (formData: BingoCreateDTO) => {
    try {
      const newBingo = await createBingo.mutateAsync(formData);
      console.log('빙고 생성 완료:', newBingo);
      // 자동으로 캐시가 업데이트됨
    } catch (error) {
      console.error('빙고 생성 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드들 */}
      <button 
        type="submit" 
        disabled={createBingo.isPending}
      >
        {createBingo.isPending ? '생성 중...' : '빙고 생성'}
      </button>
    </form>
  );
}
```

#### 3. 낙관적 업데이트

```tsx
function GoalItem({ bingoId, goal }: { bingoId: string; goal: Goal }) {
  const updateGoal = useUpdateGoal();
  const optimistic = useOptimisticGoalUpdate(bingoId);

  const handleToggle = async () => {
    // 즉시 UI 업데이트
    const rollback = optimistic.updateGoalOptimistically(goal.id, {
      completed: !goal.completed
    });

    try {
      await updateGoal.mutateAsync({
        bingoId,
        goalData: { id: goal.id, completed: !goal.completed }
      });
    } catch (error) {
      // 실패 시 롤백
      rollback();
      console.error('목표 업데이트 실패:', error);
    }
  };

  return (
    <div>
      <input 
        type="checkbox" 
        checked={goal.completed}
        onChange={handleToggle}
      />
      {goal.title}
    </div>
  );
}
```

#### 4. 사전 로딩

```tsx
function BingoListItem({ bingo }: { bingo: BingoListItem }) {
  const { prefetchBingo } = usePrefetchBingo();

  return (
    <div 
      onMouseEnter={() => prefetchBingo(bingo.id)}
      onClick={() => router.push(`/bingo/${bingo.id}`)}
    >
      {bingo.title}
    </div>
  );
}
```

## 캐시 정책

### 기본 설정

```typescript
const queryOptions = {
  // 실시간 데이터 (자주 업데이트됨)
  realtime: {
    staleTime: 0,
    gcTime: 5 * 60 * 1000, // 5분
    refetchInterval: 30 * 1000, // 30초마다 refetch
  },
  
  // 정적 데이터 (거의 변하지 않음)
  static: {
    staleTime: 60 * 60 * 1000, // 1시간
    gcTime: 24 * 60 * 60 * 1000, // 24시간
  },
  
  // 사용자 데이터 (중간 수준)
  user: {
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 30 * 60 * 1000, // 30분
  },
  
  // 백그라운드 데이터 (덜 중요함)
  background: {
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 60 * 60 * 1000, // 1시간
    refetchOnWindowFocus: false,
  },
};
```

### 커스텀 설정

```tsx
// 특별한 캐시 설정이 필요한 경우
function useRealtimeBingo(id: string) {
  return useQuery({
    queryKey: queryKeys.bingoDetail(id),
    queryFn: () => fetchBingoById(id),
    ...queryOptions.realtime, // 실시간 설정 적용
  });
}
```

## 에러 처리

```tsx
function BingoList() {
  const { data, error, isError, refetch } = useListBingo();

  if (isError) {
    return (
      <div>
        <p>데이터를 불러오는데 실패했습니다.</p>
        <p>{error?.message}</p>
        <button onClick={() => refetch()}>
          다시 시도
        </button>
      </div>
    );
  }

  return <div>{/* 정상 UI */}</div>;
}
```

## 개발 도구

개발 환경에서는 React Query Devtools가 자동으로 활성화됩니다:

- 브라우저 우하단의 React Query 아이콘 클릭
- 쿼리 상태, 캐시 데이터, 네트워크 요청 등을 실시간으로 확인
- 수동으로 쿼리 무효화, 리페치 등 가능

## 성능 최적화 팁

### 1. 필요한 데이터만 조회

```tsx
// ❌ 전체 빙고 데이터 조회
const { data: bingo } = useGetBingo(id);

// ✅ 목록에서는 요약 정보만
const { data: bingos } = useListBingo();
```

### 2. 적절한 캐시 정책 사용

```tsx
// ❌ 모든 데이터를 실시간으로
const { data } = useQuery({...queryOptions.realtime});

// ✅ 데이터 특성에 맞는 정책
const { data } = useListBingo(); // user 정책 자동 적용
```

### 3. 사전 로딩 활용

```tsx
// 사용자가 상호작용하기 전에 미리 로딩
<BingoCard 
  onMouseEnter={() => prefetchBingo(bingo.id)}
  bingo={bingo} 
/>
```

## 확장 방법

새로운 도메인 추가:

1. `src/features/[domain]/hooks/use-[domain]-queries.ts` 생성
2. 도메인별 API 함수와 타입 정의
3. queryKeys에 새 도메인 키 추가
4. 커스텀 훅 구현 및 export

```typescript
// 새 도메인 예제
export function useListUsers() {
  return useQuery({
    queryKey: queryKeys.users(),
    queryFn: fetchUsers,
    ...queryOptions.user,
  });
}
``` 