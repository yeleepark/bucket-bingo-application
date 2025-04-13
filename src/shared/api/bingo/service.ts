import {
  BingoCreateDTO,
  BingoDTO,
  BingoListItemDTO,
  BingoUpdateDTO,
  FriendBingoDTO,
  GoalUpdateDTO
} from './types';
import { BINGO_ENDPOINTS } from './endpoints';

/**
 * Custom API error class
 */
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
}

/**
 * Process API response
 */
async function processResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `API Error: ${response.status} ${response.statusText}`;

    try {
      const errorData = await response.json();
      if (errorData.message) {
        errorMessage = errorData.message;
      }
    } catch (e) {
      // Ignore JSON parsing error
    }

    throw new ApiError(errorMessage, response.status);
  }

  return await response.json();
}

/**
 * Fetches all bingo boards
 * @returns Promise with an array of bingo list items
 */
export async function fetchBingos(): Promise<BingoListItemDTO[]> {
  try {
    const response = await fetch(BINGO_ENDPOINTS.GET_ALL);
    return processResponse<BingoListItemDTO[]>(response);
  } catch (error) {
    console.error('Error fetching bingos:', error);
    throw error instanceof ApiError
      ? error
      : new Error('Failed to load bingo boards');
  }
}

/**
 * Fetches a single bingo board by ID
 * @param id The ID of the bingo board to fetch
 * @returns Promise with the bingo board data
 */
export async function fetchBingoById(id: string): Promise<BingoDTO> {
  try {
    const response = await fetch(BINGO_ENDPOINTS.GET_BY_ID(id));
    return processResponse<BingoDTO>(response);
  } catch (error) {
    console.error(`Error fetching bingo ${id}:`, error);
    throw error instanceof ApiError
      ? error
      : new Error(`Failed to load bingo board`);
  }
}

/**
 * Creates a new bingo board
 * @param data The data for the new bingo board
 * @returns Promise with the created bingo board
 */
export async function createBingo(data: BingoCreateDTO): Promise<BingoDTO> {
  try {
    const response = await fetch(BINGO_ENDPOINTS.CREATE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return processResponse<BingoDTO>(response);
  } catch (error) {
    console.error('Error creating bingo:', error);
    throw error instanceof ApiError
      ? error
      : new Error('Failed to create bingo board');
  }
}

/**
 * Updates an existing bingo board
 * @param data The updated data for the bingo board
 * @returns Promise with the updated bingo board
 */
export async function updateBingo(data: BingoUpdateDTO): Promise<BingoDTO> {
  try {
    const response = await fetch(BINGO_ENDPOINTS.UPDATE(data.id), {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return processResponse<BingoDTO>(response);
  } catch (error) {
    console.error('Error updating bingo:', error);
    throw error instanceof ApiError
      ? error
      : new Error('Failed to update bingo board');
  }
}

/**
 * Deletes a bingo board
 * @param id The ID of the bingo board to delete
 * @returns Promise with a success flag
 */
export async function deleteBingo(id: string): Promise<{ success: boolean }> {
  try {
    const response = await fetch(BINGO_ENDPOINTS.DELETE(id), {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new ApiError(`Failed to delete bingo: ${response.statusText}`, response.status);
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting bingo:', error);
    throw error instanceof ApiError
      ? error
      : new Error('Failed to delete bingo board');
  }
}

/**
 * Updates a goal within a bingo board
 * @param bingoId The ID of the bingo board containing the goal
 * @param goalData The updated data for the goal
 * @returns Promise with the updated bingo board
 */
export async function updateGoal(bingoId: string, goalData: GoalUpdateDTO): Promise<BingoDTO> {
  try {
    const response = await fetch(BINGO_ENDPOINTS.UPDATE_GOAL(bingoId, goalData.id), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goalData),
    });

    return processResponse<BingoDTO>(response);
  } catch (error) {
    console.error('Error updating goal:', error);
    throw error instanceof ApiError
      ? error
      : new Error('Failed to update goal');
  }
}

/**
 * Verifies a completed goal
 * @param bingoId The ID of the bingo board containing the goal
 * @param goalId The ID of the goal to verify
 * @returns Promise with the updated bingo board
 */
export async function verifyGoal(bingoId: string, goalId: string): Promise<BingoDTO> {
  try {
    const response = await fetch(BINGO_ENDPOINTS.VERIFY_GOAL(bingoId, goalId), {
      method: 'POST',
    });

    return processResponse<BingoDTO>(response);
  } catch (error) {
    console.error('Error verifying goal:', error);
    throw error instanceof ApiError
      ? error
      : new Error('Failed to verify goal');
  }
}

/**
 * Fetches bingo boards from friends
 * @returns Promise with an array of friend bingo data
 */
export async function fetchFriendBingos(): Promise<FriendBingoDTO[]> {
  try {
    const response = await fetch(BINGO_ENDPOINTS.GET_FRIEND_BINGOS);
    return processResponse<FriendBingoDTO[]>(response);
  } catch (error) {
    console.error('Error fetching friend bingos:', error);
    throw error instanceof ApiError
      ? error
      : new Error('Failed to load friend bingo boards');
  }
}
