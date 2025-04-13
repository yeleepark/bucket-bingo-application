/**
 * Bingo API endpoints
 */
export const BINGO_ENDPOINTS = {
  /**
   * Get all bingo boards
   * GET /api/bingo
   */
  GET_ALL: '/api/bingo',

  /**
   * Get a single bingo board by ID
   * GET /api/bingo/:id
   * @param id Bingo board ID
   */
  GET_BY_ID: (id: string) => `/api/bingo/${id}`,

  /**
   * Create a new bingo board
   * POST /api/bingo
   */
  CREATE: '/api/bingo',

  /**
   * Update an existing bingo board
   * PUT /api/bingo/:id
   * @param id Bingo board ID
   */
  UPDATE: (id: string) => `/api/bingo/${id}`,

  /**
   * Delete a bingo board
   * DELETE /api/bingo/:id
   * @param id Bingo board ID
   */
  DELETE: (id: string) => `/api/bingo/${id}`,

  /**
   * Update a goal within a bingo board
   * PUT /api/bingo/:bingoId/goals/:goalId
   * @param bingoId Bingo board ID
   * @param goalId Goal ID
   */
  UPDATE_GOAL: (bingoId: string, goalId: string) =>
    `/api/bingo/${bingoId}/goals/${goalId}`,

  /**
   * Verify a completed goal
   * POST /api/bingo/:bingoId/goals/:goalId/verify
   * @param bingoId Bingo board ID
   * @param goalId Goal ID
   */
  VERIFY_GOAL: (bingoId: string, goalId: string) =>
    `/api/bingo/${bingoId}/goals/${goalId}/verify`,

  /**
   * Get bingo boards from friends
   * GET /api/bingo/friends
   */
  GET_FRIEND_BINGOS: '/api/bingo/friends'
};
