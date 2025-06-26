import { ReactNode } from 'react';
import Title from '../typography/Title';

interface BingoTitleProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: { level: 3 as const, size: 'lg' as const },
  md: { level: 2 as const, size: 'xl' as const },
  lg: { level: 1 as const, size: '2xl' as const }
};

export default function BingoTitle({ 
  children, 
  size = 'lg',
  className = ""
}: BingoTitleProps) {
  const { level, size: titleSize } = sizeMap[size];
  
  return (
    <Title 
      level={level}
      size={titleSize}
      weight="bold"
      color="primary"
      className={className}
    >
      {children}
    </Title>
  );
} 