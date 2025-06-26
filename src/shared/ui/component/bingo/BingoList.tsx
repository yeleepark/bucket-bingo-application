import Text from '../typography/Text';
import BingoSubtitle from './BingoSubtitle';
import BingoTitle from './BingoTitle';

interface BingoItem {
  id: string;
  title: string;
  description: string;
  theme: string;
  progress: number;
  completedGoals: number;
  goals: number;
}

interface BingoListProps {
  bingos: BingoItem[];
  onBingoClick?: (bingo: BingoItem) => void;
  className?: string;
}

export default function BingoList({ 
  bingos, 
  onBingoClick,
  className = ""
}: BingoListProps) {
  if (!bingos || bingos.length === 0) {
    return null;
  }

  return (
    <div className={`grid gap-4 ${className}`}>
      {bingos.map((bingo) => (
        <div 
          key={bingo.id} 
          onClick={() => onBingoClick?.(bingo)}
          className={`
            flex items-center justify-between p-4 
            border border-gray-100 dark:border-gray-600 
            rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700
            transition-colors duration-150
            ${onBingoClick ? 'cursor-pointer' : ''}
          `}
        >
          <div>
            <BingoTitle size="sm" className="mb-1">
              {bingo.title}
            </BingoTitle>
            <BingoSubtitle size="sm" className="mb-2">
              {bingo.description}
            </BingoSubtitle>
            <span className="inline-block px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
              {bingo.theme}
            </span>
          </div>
          <div className="text-right">
            <Text size="sm" color="muted" as="div">
              진행률: {bingo.progress}%
            </Text>
            <Text size="sm" color="muted" as="div">
              {bingo.completedGoals}/{bingo.goals}
            </Text>
          </div>
        </div>
      ))}
    </div>
  );
} 