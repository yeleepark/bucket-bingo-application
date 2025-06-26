import { ReactNode } from 'react';
import Text from '../typography/Text';

interface BingoSubtitleProps {
  children: ReactNode;
  size?: 'sm' | 'md';
  className?: string;
}

export default function BingoSubtitle({ 
  children, 
  size = 'md',
  className = ""
}: BingoSubtitleProps) {
  return (
    <Text 
      size={size}
      color="muted"
      className={className}
    >
      {children}
    </Text>
  );
} 