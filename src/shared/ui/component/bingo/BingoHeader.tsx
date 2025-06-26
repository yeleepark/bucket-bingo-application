import Text from '../typography/Text';
import BingoTitle from './BingoTitle';

interface BingoHeaderProps {
  title: string;
  progress?: number;
  completed?: number;
  total?: number;
  className?: string;
}

export default function BingoHeader({ 
  title, 
  progress, 
  completed, 
  total,
  className = ""
}: BingoHeaderProps) {
  return (
    <div className={`
      flex items-center justify-between my-8
      ${className}
    `}>
      <BingoTitle size="lg">
        {title}
      </BingoTitle>
      {(progress !== undefined || (completed !== undefined && total !== undefined)) && (
        <div className="flex items-center gap-2">
          {progress !== undefined && (
            <>
              <Text as="span" color="muted">
                달성률: {progress}%
              </Text>
              {(completed !== undefined && total !== undefined) && (
                <Text as="span" color="muted">|</Text>
              )}
            </>
          )}
          {(completed !== undefined && total !== undefined) && (
            <Text as="span" color="muted">
              {completed}/{total} 완료
            </Text>
          )}
        </div>
      )}
    </div>
  );
}