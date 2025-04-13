export type Bingo = {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  goals: BingoGoal[];
  completionRate: number;
  bingoLines: number;
};

export type BingoGoal = {
  id: string;
  content: string;
  completed: boolean;
  completedDate?: string;
  verified: boolean;
  verifiedBy?: string;
};

export type Friend = {
  id: string;
  name: string;
  activeBingo?: {
    title: string;
    completionRate: number;
  };
};
