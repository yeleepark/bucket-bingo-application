import { ReactNode } from 'react';
import Text from '../typography/Text';

interface BingoStatItemProps {
  date?: string;
  children: ReactNode;
  className?: string;
}

export default function BingoStatItem({ 
  date,
  children, 
  className = ""
}: BingoStatItemProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {date && (
        <Text 
          as="span"
          size="sm"
          color="muted"
          className="w-20"
        >
          {date}
        </Text>
      )}
      <Text 
        as="span"
        size="sm"
        color="primary"
      >
        {children}
      </Text>
    </div>
  );
} 