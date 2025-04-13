/**
 * Represents a goal within a bingo board
 */
export interface BingoGoalDTO {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * A list item representing a bingo board in list views
 */
export interface BingoListItemDTO {
  id: string;
  title: string;
  description: string;
  theme: string;
  progress: number; // Percentage complete
  goals: number; // Total number of goals
  completedGoals: number; // Number of completed goals
  createdAt: string;
  updatedAt: string;
}

/**
 * Full representation of a bingo board including all goals
 */
export interface BingoDTO {
  id: string;
  title: string;
  description: string;
  theme: string;
  goals: BingoGoalDTO[];
  createdAt: string;
  updatedAt: string;
  userId: string;
  isPublic: boolean;
}

/**
 * Data required to create a new bingo board
 */
export interface BingoCreateDTO {
  title: string;
  description: string;
  theme: string;
  goals: Array<{
    title: string;
    description: string;
  }>;
  isPublic: boolean;
}

/**
 * Data required to update an existing bingo board
 */
export interface BingoUpdateDTO {
  id: string;
  title?: string;
  description?: string;
  theme?: string;
  isPublic?: boolean;
}

/**
 * Data required to update a goal within a bingo board
 */
export interface GoalUpdateDTO {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
}

/**
 * Representation of a friend's bingo board
 */
export interface FriendBingoDTO {
  id: string;
  title: string;
  description: string;
  theme: string;
  progress: number;
  userId: string;
  userName: string;
  userAvatar: string;
  createdAt: string;
  updatedAt: string;
}
