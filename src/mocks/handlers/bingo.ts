import { http, HttpResponse } from 'msw';
import { mockBingos, mockBingoListItems, mockFriendBingos } from '../data/bingo';
import { BINGO_ENDPOINTS } from '@/shared/api/bingo/endpoints';
import { BingoCreateDTO, BingoDTO, BingoGoalDTO, BingoUpdateDTO, GoalUpdateDTO } from '@/shared/api/bingo/types';

export const bingoHandlers = [
  // Get all bingos
  http.get(BINGO_ENDPOINTS.GET_ALL, () => {
    return HttpResponse.json(mockBingoListItems);
  }),

  // Get bingo by ID
  http.get(`${BINGO_ENDPOINTS.GET_ALL}/:id`, ({ params }) => {
    const { id } = params;
    const bingo = mockBingos.find(b => b.id === id);

    if (!bingo) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(bingo);
  }),

  // Create new bingo
  http.post(BINGO_ENDPOINTS.CREATE, async ({ request }) => {
    const newBingo = await request.json();

    const createdBingo = {
      ...newBingo,
      id: `bingo${mockBingos.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      goals: newBingo.goals.map((goal, index) => ({
        ...goal,
        id: `newgoal${index + 1}`,
        completed: false,
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })),
      userId: 'user1', // Assuming current user
      isPublic: newBingo.isPublic || false
    };

    mockBingos.push(createdBingo);

    // Also update the list items
    const completedGoals = createdBingo.goals.filter(goal => goal.completed).length;
    mockBingoListItems.push({
      id: createdBingo.id,
      title: createdBingo.title,
      description: createdBingo.description,
      theme: createdBingo.theme,
      progress: completedGoals / createdBingo.goals.length,
      goals: createdBingo.goals.length,
      completedGoals,
      createdAt: createdBingo.createdAt,
      updatedAt: createdBingo.updatedAt
    });

    return HttpResponse.json(createdBingo, { status: 201 });
  }),

  // Update bingo
  http.put(`${BINGO_ENDPOINTS.GET_ALL}/:id`, async ({ request, params }) => {
    const { id } = params;
    const updateData = await request.json();

    const bingoIndex = mockBingos.findIndex(b => b.id === id);

    if (bingoIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const updatedBingo = {
      ...mockBingos[bingoIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    mockBingos[bingoIndex] = updatedBingo;

    // Update the list item as well
    const completedGoals = updatedBingo.goals.filter(goal => goal.completed).length;
    const listItemIndex = mockBingoListItems.findIndex(item => item.id === id);

    if (listItemIndex !== -1) {
      mockBingoListItems[listItemIndex] = {
        id: updatedBingo.id,
        title: updatedBingo.title,
        description: updatedBingo.description,
        theme: updatedBingo.theme,
        progress: completedGoals / updatedBingo.goals.length,
        goals: updatedBingo.goals.length,
        completedGoals,
        createdAt: updatedBingo.createdAt,
        updatedAt: updatedBingo.updatedAt
      };
    }

    return HttpResponse.json(updatedBingo);
  }),

  // Delete bingo
  http.delete(`${BINGO_ENDPOINTS.GET_ALL}/:id`, ({ params }) => {
    const { id } = params;
    const bingoIndex = mockBingos.findIndex(b => b.id === id);

    if (bingoIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockBingos.splice(bingoIndex, 1);

    // Remove from list items too
    const listItemIndex = mockBingoListItems.findIndex(item => item.id === id);
    if (listItemIndex !== -1) {
      mockBingoListItems.splice(listItemIndex, 1);
    }

    return new HttpResponse(null, { status: 204 });
  }),

  // Update goal
  http.patch(`${BINGO_ENDPOINTS.GET_ALL}/:bingoId/goals/:goalId`, async ({ request, params }) => {
    const { bingoId, goalId } = params;
    const updateData = await request.json();

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
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    mockBingos[bingoIndex].updatedAt = new Date().toISOString();

    // Update the list item progress as well
    const completedGoals = mockBingos[bingoIndex].goals.filter(goal => goal.completed).length;
    const listItemIndex = mockBingoListItems.findIndex(item => item.id === bingoId);

    if (listItemIndex !== -1) {
      mockBingoListItems[listItemIndex] = {
        ...mockBingoListItems[listItemIndex],
        progress: completedGoals / mockBingos[bingoIndex].goals.length,
        completedGoals,
        updatedAt: mockBingos[bingoIndex].updatedAt
      };
    }

    return HttpResponse.json(mockBingos[bingoIndex]);
  }),

  // Verify goal
  http.post(`${BINGO_ENDPOINTS.GET_ALL}/:bingoId/goals/:goalId/verify`, ({ params }) => {
    const { bingoId, goalId } = params;

    const bingoIndex = mockBingos.findIndex(b => b.id === bingoId);

    if (bingoIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    const goalIndex = mockBingos[bingoIndex].goals.findIndex(g => g.id === goalId);

    if (goalIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    // Verify the goal
    mockBingos[bingoIndex].goals[goalIndex].verified = true;
    mockBingos[bingoIndex].goals[goalIndex].updatedAt = new Date().toISOString();
    mockBingos[bingoIndex].updatedAt = new Date().toISOString();

    return HttpResponse.json(mockBingos[bingoIndex]);
  }),

  // Get friend bingos
  http.get(BINGO_ENDPOINTS.GET_FRIEND_BINGOS, () => {
    return HttpResponse.json(mockFriendBingos);
  })
];
