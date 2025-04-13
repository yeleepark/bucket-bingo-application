"use client";

import { useEffect, useState } from 'react';
import { PageLayout } from '@/widgets';
import { HeroSection, BingosSection, FriendsSection } from '@/widgets/sections';
import { fetchBingos, fetchFriendBingos } from '@/shared/api/bingo/service';
import { BingoListItemDTO, FriendBingoDTO } from '@/shared/api/bingo/types';

export default function Home() {
  const [bingos, setBingos] = useState<BingoListItemDTO[]>([]);
  const [friendBingos, setFriendBingos] = useState<FriendBingoDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Fetch user's bingos
        const bingoData = await fetchBingos();
        setBingos(bingoData);

        // Fetch friend bingos
        const friendBingoData = await fetchFriendBingos();
        setFriendBingos(friendBingoData);

        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  // Transform bingo data for BingosSection
  const bingoItems = bingos.map(bingo => ({
    id: bingo.id,
    title: bingo.title,
    startDate: new Date(bingo.createdAt).toLocaleDateString(),
    completionRate: Math.round(bingo.progress * 100),
    completedGoals: bingo.completedGoals,
    totalGoals: bingo.goals
  }));

  // Transform friend bingo data for FriendsSection
  const friendItems = friendBingos.map(friend => ({
    id: friend.userId,
    name: friend.userName,
    activeBingo: {
      title: friend.title,
      completionRate: Math.round(friend.progress * 100)
    }
  }));

  return (
    <PageLayout>
      <main className="container mx-auto px-4 py-8">
        <HeroSection
          title="나만의 버킷 빙고를 만들고 달성해보세요"
          description="단기 목표와 장기 목표를 빙고 형식으로 설정하고, 친구의 확인으로 달성을 인증받으세요."
        />

        {isLoading ? (
          <div className="my-10 text-center">로딩 중...</div>
        ) : error ? (
          <div className="my-10 text-center text-red-500">{error}</div>
        ) : (
          <>
            <BingosSection
              title="나의 진행 중인 빙고"
              bingos={bingoItems}
              viewAllLink="/bingos"
            />

            <FriendsSection
              title="친구들의 빙고"
              friends={friendItems}
              viewAllLink="/friends"
            />
          </>
        )}
      </main>
    </PageLayout>
  );
}
