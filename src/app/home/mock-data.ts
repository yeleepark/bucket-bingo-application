import { Friend } from '@/entities/bingo';

export const mockBingos = [
  {
    id: '1',
    title: '2024년 목표 빙고',
    startDate: '2024.01.01',
    completionRate: 35,
    completedGoals: 35,
    totalGoals: 100,
  },
  {
    id: '2',
    title: '운동 목표 빙고',
    startDate: '2024.01.15',
    completionRate: 20,
    completedGoals: 20,
    totalGoals: 100,
  },
  {
    id: '3',
    title: '독서 목표 빙고',
    startDate: '2024.02.01',
    completionRate: 15,
    completedGoals: 15,
    totalGoals: 100,
  },
];

export const mockFriends: Friend[] = [
  {
    id: '1',
    name: '김미영',
    activeBingo: {
      title: '2024년 목표 빙고',
      completionRate: 42,
    },
  },
  {
    id: '2',
    name: '이준호',
    activeBingo: {
      title: '운동 목표 빙고',
      completionRate: 28,
    },
  },
  {
    id: '3',
    name: '박소연',
    activeBingo: {
      title: '독서 목표 빙고',
      completionRate: 35,
    },
  },
  {
    id: '4',
    name: '최민수',
    activeBingo: {
      title: '취사웹 빙고',
      completionRate: 51,
    },
  },
];
