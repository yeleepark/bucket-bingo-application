import { ReactNode } from 'react';

interface ListProps {
  children: ReactNode;
  variant?: 'unordered' | 'ordered';
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

interface ListItemProps {
  children: ReactNode;
  className?: string;
}

const spacingClasses = {
  none: 'space-y-0',
  sm: 'space-y-1',
  md: 'space-y-2',
  lg: 'space-y-4'
};

export function List({ 
  children, 
  variant = 'unordered',
  spacing = 'sm',
  className = ""
}: ListProps) {
  const Component = variant === 'ordered' ? 'ol' : 'ul';
  
  return (
    <Component className={`
      ${spacingClasses[spacing]}
      ${className}
    `}>
      {children}
    </Component>
  );
}

export function ListItem({ 
  children, 
  className = ""
}: ListItemProps) {
  return (
    <li className={`flex items-center gap-2 ${className}`}>
      {children}
    </li>
  );
}

export default List; 