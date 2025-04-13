import React from 'react';
import { Card, CardHeader, CardContent, CardFooter, Badge, CheckIcon } from '@/shared/ui';

type BingoCardProps = {
  title: string;
  startDate: string;
  completionRate: number;
  completedGoals: number;
  totalGoals: number;
  href?: string;
};

export function BingoCard({
  title,
  startDate,
  completionRate,
  completedGoals,
  totalGoals,
  href,
}: BingoCardProps) {
  return (
    <Card href={href}>
      <CardHeader
        title={title}
        badge={<Badge variant="success">진행중</Badge>}
      />
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">시작일: {startDate}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-sm">달성률 {completionRate}%</p>
          </div>
          <div className="flex items-center gap-1">
            <CheckIcon size={16} className="text-green-500" />
            <span className="text-sm text-gray-600">
              {completedGoals}/{totalGoals} 완료
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
