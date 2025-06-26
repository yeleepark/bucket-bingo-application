import { CheckIcon } from '../icon';

interface BingoCell {
  id: number;
  goal: string;
  completed: boolean;
}

interface BingoBoardProps {
  cells: BingoCell[];
  onCellClick?: (cell: BingoCell) => void;
  gridSize?: number;
  className?: string;
}

export default function BingoBoard({ 
  cells, 
  onCellClick,
  gridSize = 10,
  className = ""
}: BingoBoardProps) {
  return (
    <div className={`
      bg-white dark:bg-gray-800 
      border border-gray-200 dark:border-gray-700 
      rounded-xl shadow-sm overflow-hidden
      ${className}
    `}>
      <div 
        className="grid gap-px bg-gray-200 dark:bg-gray-600"
        style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
      >
        {cells.map((cell) => (
          <div
            key={cell.id}
            onClick={() => onCellClick?.(cell)}
            className={`
              aspect-square flex flex-col items-center justify-center p-2
              transition-colors duration-150
              ${onCellClick ? 'cursor-pointer' : ''}
              ${cell.completed 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
              }
            `}
          >
            <div className="text-xs sm:text-sm font-medium text-center break-words w-full">
              {cell.goal}
            </div>
            {cell.completed && (
              <CheckIcon className="mt-1 w-4 h-4 text-green-600 dark:text-green-400" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 