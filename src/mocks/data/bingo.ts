import { BingoDTO, BingoGoalDTO, BingoListItemDTO, FriendBingoDTO } from '@/shared/api/bingo/types';

// Mock bingo goals
export const mockGoals: BingoGoalDTO[] = [
  {
    id: 'goal1',
    title: 'Visit Paris',
    description: 'See the Eiffel Tower and visit the Louvre',
    completed: true,
    verified: true,
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-02-20T14:15:00Z'
  },
  {
    id: 'goal2',
    title: 'Learn to surf',
    description: 'Take surfing lessons and ride a wave',
    completed: false,
    verified: false,
    createdAt: '2023-01-15T10:32:00Z',
    updatedAt: '2023-01-15T10:32:00Z'
  },
  {
    id: 'goal3',
    title: 'Run a marathon',
    description: 'Complete a full 26.2-mile marathon',
    completed: false,
    verified: false,
    createdAt: '2023-01-15T10:35:00Z',
    updatedAt: '2023-01-15T10:35:00Z'
  },
  {
    id: 'goal4',
    title: 'See the Northern Lights',
    description: 'Travel to Norway or Iceland to see the Aurora Borealis',
    completed: true,
    verified: false,
    createdAt: '2023-01-15T10:40:00Z',
    updatedAt: '2023-05-10T09:20:00Z'
  },
  {
    id: 'goal5',
    title: 'Write a book',
    description: 'Complete and publish a novel',
    completed: false,
    verified: false,
    createdAt: '2023-01-15T10:45:00Z',
    updatedAt: '2023-01-15T10:45:00Z'
  }
];

// More goals for other bingo boards
export const summerGoals: BingoGoalDTO[] = [
  {
    id: 'summergoal1',
    title: 'Go camping',
    description: 'Camp outdoors for at least one weekend',
    completed: true,
    verified: true,
    createdAt: '2023-04-10T10:30:00Z',
    updatedAt: '2023-06-15T14:15:00Z'
  },
  {
    id: 'summergoal2',
    title: 'Beach day',
    description: 'Spend a full day at the beach',
    completed: true,
    verified: true,
    createdAt: '2023-04-10T10:35:00Z',
    updatedAt: '2023-07-02T16:45:00Z'
  },
  {
    id: 'summergoal3',
    title: 'Learn to paddleboard',
    description: 'Take a paddleboarding lesson',
    completed: false,
    verified: false,
    createdAt: '2023-04-10T10:40:00Z',
    updatedAt: '2023-04-10T10:40:00Z'
  },
  {
    id: 'summergoal4',
    title: 'Attend a concert',
    description: 'Go to an outdoor summer concert',
    completed: false,
    verified: false,
    createdAt: '2023-04-10T10:45:00Z',
    updatedAt: '2023-04-10T10:45:00Z'
  }
];

// Mock bingo boards
export const mockBingos: BingoDTO[] = [
  {
    id: 'bingo1',
    title: 'Life Bucket List',
    description: 'Things I want to do in my lifetime',
    theme: 'adventure',
    goals: [...mockGoals],
    createdAt: '2023-01-15T10:30:00Z',
    updatedAt: '2023-05-10T09:20:00Z',
    userId: 'user1',
    isPublic: true
  },
  {
    id: 'bingo2',
    title: 'Summer 2023',
    description: 'Goals for this summer',
    theme: 'seasonal',
    goals: [...summerGoals],
    createdAt: '2023-04-10T10:30:00Z',
    updatedAt: '2023-07-02T16:45:00Z',
    userId: 'user1',
    isPublic: true
  }
];

// Bingo list items (simplified versions of full bingo data)
export const mockBingoListItems: BingoListItemDTO[] = mockBingos.map(bingo => {
  const completedGoals = bingo.goals.filter(goal => goal.completed).length;
  return {
    id: bingo.id,
    title: bingo.title,
    description: bingo.description,
    theme: bingo.theme,
    progress: completedGoals / bingo.goals.length,
    goals: bingo.goals.length,
    completedGoals,
    createdAt: bingo.createdAt,
    updatedAt: bingo.updatedAt
  };
});

// Friend bingos
export const mockFriendBingos: FriendBingoDTO[] = [
  {
    id: 'bingo3',
    title: 'Travel Adventures',
    description: 'My travel bucket list',
    theme: 'travel',
    progress: 0.4,
    userId: 'friend1',
    userName: 'Alex Thompson',
    userAvatar: 'https://i.pravatar.cc/150?u=friend1',
    createdAt: '2023-02-10T08:30:00Z',
    updatedAt: '2023-06-18T15:20:00Z'
  },
  {
    id: 'bingo4',
    title: 'Fitness Goals',
    description: 'My fitness journey',
    theme: 'fitness',
    progress: 0.7,
    userId: 'friend2',
    userName: 'Sam Wilson',
    userAvatar: 'https://i.pravatar.cc/150?u=friend2',
    createdAt: '2023-03-05T14:45:00Z',
    updatedAt: '2023-07-01T09:10:00Z'
  }
];
