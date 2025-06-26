import { ReactNode } from 'react';
import Title from '../typography/Title';

interface BingoTableTitleProps {
  children: ReactNode;
  className?: string;
}

export default function BingoTableTitle({ 
  children, 
  className = ""
}: BingoTableTitleProps) {
  return (
    <Title 
      level={3}
      size="md"
      weight="medium"
      color="primary"
      className={className}
    >
      {children}
    </Title>
  );
} 