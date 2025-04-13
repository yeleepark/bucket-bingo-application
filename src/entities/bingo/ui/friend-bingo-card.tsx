import React from 'react';
import { Avatar } from '@/shared/ui';

type FriendBingoCardProps = {
  name: string;
  bingoTitle: string;
  completionRate: number;
  avatarBgColor?: string;
  avatarTextColor?: string;
};

export function FriendBingoCard({
  name,
  bingoTitle,
  completionRate,
  avatarBgColor,
  avatarTextColor,
}: FriendBingoCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2">
        <Avatar
          name={name}
          bgColor={avatarBgColor}
          textColor={avatarTextColor}
        />
      </div>
      <p className="font-medium">{name}</p>
      <p className="text-xs text-gray-500">{bingoTitle}</p>
      <p className="text-sm font-medium">{completionRate}% 달성</p>
    </div>
  );
}
