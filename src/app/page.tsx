"use client";

import { useListBingo } from '@/features/bingo/hooks';
import {
  BingoList,
  Button,
  ChevronRightIcon,
  Container,
  Footer,
  Header,
  LinkButton,
  LoadingSpinner,
  PlusIcon,
  Section,
  Text,
  ThemeToggle,
  Title
} from '@/shared/ui';

export default function Home() {
  const { data: bingos = [], isLoading: isBingosLoading, error: bingosError } = useListBingo();
  // const { data: friendBingos = [], isLoading: isFriendBingosLoading, error: friendBingosError } = useFriendBingos();
  
  const isLoading = isBingosLoading;
  const error = bingosError;

  if (isLoading) {
    return (
      <LoadingSpinner 
        message="데이터를 불러오는 중..."
        submessage="잠시만 기다려주세요"
      />
    );
  }

  if (error) {
    return (
      <Container>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md">
            <Text color="error" weight="medium" className="mb-4 text-lg">
              데이터를 불러오는데 실패했습니다
            </Text>
            <Text color="muted" size="sm" className="mb-4">
              {error.message || '알 수 없는 오류가 발생했습니다.'}
            </Text>
            <Button onClick={() => window.location.reload()} variant="primary">
              다시 시도
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header 
        actions={
          <>
            <ThemeToggle />
            <LinkButton 
              href="/bingo/create" 
              variant="primary"
              icon={<PlusIcon />}
            >
              새 빙고 만들기
            </LinkButton>
          </>
        }
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Section className="py-12 text-center">
          <Title level={1} size="3xl" className="mb-4">
            나만의 버킷 빙고를 만들고 달성해보세요
          </Title>
          <Text 
            size="lg" 
            color="muted" 
            className="mb-8 max-w-2xl mx-auto"
          >
            단기 목표와 장기 목표를 빙고 형식으로 설정하고, 친구의 확인으로 달성을 인증받으세요.
          </Text>
          <LinkButton 
            href="/bingo/create"
            variant="primary"
            size="lg"
            icon={<PlusIcon />}
          >
            첫 빙고 만들기
          </LinkButton>
        </Section>

        {/* My Bingos Section */}
        <Section 
          title="나의 진행 중인 빙고" 
          variant="card"
          className="mt-10"
        >
          <div className="flex justify-between items-center mb-6">
            <Title level={2} size="xl">
              나의 진행 중인 빙고
            </Title>
            <LinkButton
              href="/bingo"
              variant="ghost"
              size="sm"
              icon={<ChevronRightIcon />}
            >
              전체보기
            </LinkButton>
          </div>

          {bingos.length > 0 ? (
            <BingoList 
              bingos={bingos}
              onBingoClick={(bingo) => window.location.href = `/bingo/${bingo.id}`}
            />
          ) : (
            <div className="text-center py-8">
              <Text color="muted" className="mb-4">
                아직 생성된 빙고가 없습니다
              </Text>
              <LinkButton 
                href="/bingo/create"
                variant="primary"
                icon={<PlusIcon />}
              >
                첫 빙고 만들기
              </LinkButton>
            </div>
          )}
        </Section>

        {/* Friends Section */}
        <Section 
          title="친구들의 빙고" 
          variant="bordered"
          className="mt-8"
        >
          <div className="flex justify-between items-center mb-6">
            <Title level={2} size="xl">
              친구들의 빙고
            </Title>
            <LinkButton
              href="/friends"
              variant="ghost"
              size="sm"
              icon={<ChevronRightIcon />}
            >
              전체보기
            </LinkButton>
          </div>

          {/* {friendBingos.length > 0 ? (
            <div className="grid gap-4">
              {friendBingos.slice(0, 3).map((friend) => (
                <div 
                  key={friend.userId}
                  className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                  onClick={() => window.location.href = `/friends/${friend.userId}`}
                >
                  <div>
                    <Title level={3} size="md" className="mb-1">
                      {friend.userName}
                    </Title>
                    <Text color="muted" size="sm">
                      {friend.title}
                    </Text>
                  </div>
                  <div className="text-right">
                    <Text size="sm" color="muted">
                      진행률: {Math.round(friend.progress * 100)}%
                    </Text>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Text color="muted" className="mb-4">
                친구들의 빙고가 없습니다
              </Text>
              <LinkButton 
                href="/friends"
                variant="secondary"
              >
                친구 찾기
              </LinkButton>
            </div>
          )} */}
        </Section>
      </main>

      <Footer />
    </Container>
  );
}
