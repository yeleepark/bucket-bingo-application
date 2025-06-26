import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl', 
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full'
};

export default function Container({ 
  children, 
  className = '', 
  size = 'lg' 
}: ContainerProps) {
  return (
    <div className={`
      flex flex-col min-h-screen p-6 mx-auto
      bg-white dark:bg-gray-900 
      transition-colors duration-300
      ${sizeClasses[size]}
      ${className}
    `}>
      {children}
    </div>
  );
} 