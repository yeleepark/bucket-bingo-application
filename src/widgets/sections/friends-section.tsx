import React from 'react';
import Link from 'next/link';
import { FriendBingoCard } from '@/entities/bingo';
import { Friend } from '@/entities/bingo';

type FriendsSectionProps = {
  title: string;
  friends: Friend[];
  viewAllLink?: string;
};

const AVATAR_COLORS = [
  { bg: 'bg-blue-100', text: 'text-blue-700' },
  { bg: 'bg-green-100', text: 'text-green-700' },
  { bg: 'bg-purple-100', text: 'text-purple-700' },
  { bg: 'bg-yellow-100', text: 'text-yellow-700' },
  { bg: 'bg-pink-100', text: 'text-pink-700' },
];

export function FriendsSection({ title, friends, viewAllLink }: FriendsSectionProps) {
  return (
    <div className="mt-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-sm text-gray-500 hover:text-gray-700">
            전체보기
          </Link>
        )}
      </div>

      <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
        {friends.map((friend, index) => {
          // Cycle through colors
          const colorIndex = index % AVATAR_COLORS.length;
          const { bg, text } = AVATAR_COLORS[colorIndex];

          return (
            <FriendBingoCard
              key={friend.id}
              name={friend.name}
              bingoTitle={friend.activeBingo?.title || ''}
              completionRate={friend.activeBingo?.completionRate || 0}
              avatarBgColor={bg}
              avatarTextColor={text}
            />
          );
        })}
      </div>
    </div>
  );
}
