import { http, HttpResponse, delay } from 'msw';
import { BINGO_ENDPOINTS } from '@/shared/api/bingo/endpoints';
import {
  BingoDTO,
  BingoGoalDTO,
  BingoListItemDTO,
  FriendBingoDTO
} from '@/shared/api/bingo/types';

// Mock data for bingo goals
const mockGoals: BingoGoalDTO[] = [
  {
    id: 'goal1',
    title: 'Visit the Eiffel Tower',
    description: 'Take a photo at the top of the Eiffel Tower',
    completed: false,
    verified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'goal2',
    title: 'Try escargot',
    description: 'Taste authentic French escargot at a local restaurant',
    completed: true,
    verified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'goal3',
    title: 'Visit the Louvre Museum',
    description: 'See the Mona Lisa and other famous artworks',
    completed: false,
    verified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'goal4',
    title: 'Walk along Seine River',
    description: 'Take an evening stroll along the Seine River',
    completed: true,
    verified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 'goal5',
    title: 'Visit Notre Dame',
    description: 'Explore the iconic cathedral',
    completed: false,
    verified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock data for bingo boards
const mockBingos: BingoDTO[] = [
  {
    id: 'bingo1',
    title: 'Paris Trip 2023',
    description: 'My bucket list for our trip to Paris',
    goals: [...mockGoals],
    private: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user1'
  },
  {
    id: 'bingo2',
    title: 'Summer Adventures',
    description: 'Things to do this summer',
    goals: [
      {
        id: 'goal6',
        title: 'Go camping',
        description: 'Weekend camping trip in the mountains',
        completed: false,
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'goal7',
        title: 'Beach day',
        description: 'Spend a full day at the beach',
        completed: true,
        verified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'goal8',
        title: 'Hiking trip',
        description: 'Hike a challenging trail',
        completed: false,
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    private: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user1'
  }
];

// Mock data for friend bingos
const mockFriendBingos: FriendBingoDTO[] = [
  {
    id: 'bingo3',
    title: 'New York City Trip',
    description: 'My NYC bucket list',
    goals: [
      {
        id: 'goal9',
        title: 'Visit Empire State Building',
        description: 'Go to the observation deck',
        completed: true,
        verified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'goal10',
        title: 'Walk in Central Park',
        description: 'Take a peaceful walk through Central Park',
        completed: false,
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    private: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user2',
    userName: 'Jane Smith',
    userAvatar: 'https://i.pravatar.cc/150?u=user2'
  },
  {
    id: 'bingo4',
    title: 'Retirement Goals',
    description: 'Things to do when I retire',
    goals: [
      {
        id: 'goal11',
        title: 'Visit all 50 states',
        description: 'Travel to all the US states',
        completed: false,
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: 'goal12',
        title: 'Learn to play piano',
        description: 'Take piano lessons and learn to play well',
        completed: true,
        verified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ],
    private: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: 'user3',
    userName: 'Robert Johnson',
    userAvatar: 'https://i.pravatar.cc/150?u=user3'
  }
];

// Create bingo list items based on full bingo data
const mockBingoListItems: BingoListItemDTO[] = mockBingos.map(bingo => {
  const completedGoals = bingo.goals.filter(goal => goal.completed).length;
  return {
    id: bingo.id,
    title: bingo.title,
    description: bingo.description,
    progress: completedGoals / bingo.goals.length,
    goals: bingo.goals.length,
    completedGoals,
    private: bingo.private,
    createdAt: bingo.createdAt,
    updatedAt: bingo.updatedAt,
    userId: bingo.userId
  };
});

// Helper function to find a bingo by ID
const findBingoById = (id: string): BingoDTO | undefined => {
  return mockBingos.find(bingo => bingo.id === id);
};

// Create MSW handlers for bingo API endpoints
export const bingoHandlers = [
  // GET all bingos
  http.get(BINGO_ENDPOINTS.GET_ALL, async () => {
    await delay(500); // Simulate network delay
    return HttpResponse.json(mockBingoListItems);
  }),

  // GET bingo by ID
  http.get(BINGO_ENDPOINTS.GET_BY_ID(':id'), async ({ params }) => {
    await delay(500);
    const bingo = findBingoById(params.id as string);

    if (!bingo) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(bingo);
  }),

  // POST create bingo
  http.post(BINGO_ENDPOINTS.CREATE, async ({ request }) => {
    await delay(500);
    const newBingoData = await request.json();

    const newBingo: BingoDTO = {
      id: `bingo${mockBingos.length + 1}`,
      ...newBingoData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      userId: 'user1' // Mock user ID
    };

    mockBingos.push(newBingo);

    return HttpResponse.json(newBingo, { status: 201 });
  }),

  // PUT update bingo
  http.put(BINGO_ENDPOINTS.UPDATE(':id'), async ({ request, params }) => {
    await delay(500);
    const updateData = await request.json();
    const bingoIndex = mockBingos.findIndex(b => b.id === params.id);

    if (bingoIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedBingo = {
      ...mockBingos[bingoIndex],
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    mockBingos[bingoIndex] = updatedBingo;

    return HttpResponse.json(updatedBingo);
  }),

  // DELETE bingo
  http.delete(BINGO_ENDPOINTS.DELETE(':id'), async ({ params }) => {
    await delay(500);
    const bingoIndex = mockBingos.findIndex(b => b.id === params.id);

    if (bingoIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockBingos.splice(bingoIndex, 1);

    return HttpResponse.json({ success: true });
  }),

  // PUT update goal
  http.put(BINGO_ENDPOINTS.UPDATE_GOAL(':bingoId', ':goalId'), async ({ request, params }) => {
    await delay(500);
    const { bingoId, goalId } = params;
    const goalData = await request.json();

    const bingoIndex = mockBingos.findIndex(b => b.id === bingoId);

    if (bingoIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const goalIndex = mockBingos[bingoIndex].goals.findIndex(g => g.id === goalId);

    if (goalIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockBingos[bingoIndex].goals[goalIndex] = {
      ...mockBingos[bingoIndex].goals[goalIndex],
      ...goalData,
      updatedAt: new Date().toISOString()
    };

    mockBingos[bingoIndex].updatedAt = new Date().toISOString();

    return HttpResponse.json(mockBingos[bingoIndex]);
  }),

  // POST verify goal
  http.post(BINGO_ENDPOINTS.VERIFY_GOAL(':bingoId', ':goalId'), async ({ params }) => {
    await delay(500);
    const { bingoId, goalId } = params;

    const bingoIndex = mockBingos.findIndex(b => b.id === bingoId);

    if (bingoIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const goalIndex = mockBingos[bingoIndex].goals.findIndex(g => g.id === goalId);

    if (goalIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockBingos[bingoIndex].goals[goalIndex].verified = true;
    mockBingos[bingoIndex].goals[goalIndex].updatedAt = new Date().toISOString();
    mockBingos[bingoIndex].updatedAt = new Date().toISOString();

    return HttpResponse.json(mockBingos[bingoIndex]);
  }),

  // GET friend bingos
  http.get(BINGO_ENDPOINTS.GET_FRIEND_BINGOS, async () => {
    await delay(500);
    return HttpResponse.json(mockFriendBingos);
  })
];
