import React from 'react';
import { BingoCard } from '@/entities/bingo';
import { Bingo } from '@/entities/bingo';
import Link from 'next/link';

type BingosSectionProps = {
  title: string;
  bingos: {
    id: string;
    title: string;
    startDate: string;
    completionRate: number;
    completedGoals: number;
    totalGoals: number;
  }[];
  viewAllLink?: string;
};

export function BingosSection({ title, bingos, viewAllLink }: BingosSectionProps) {
  return (
    <div className="mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{title}</h2>
        {viewAllLink && (
          <Link href={viewAllLink} className="text-sm text-gray-500 hover:text-gray-700">
            전체보기
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {bingos.map((bingo) => (
          <BingoCard
            key={bingo.id}
            title={bingo.title}
            startDate={bingo.startDate}
            completionRate={bingo.completionRate}
            completedGoals={bingo.completedGoals}
            totalGoals={bingo.totalGoals}
            href={`/bingo/${bingo.id}`}
          />
        ))}
      </div>
    </div>
  );
}
