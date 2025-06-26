import { ReactNode, createElement } from 'react';

interface TitleProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'accent';
  className?: string;
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm', 
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl'
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

const colorClasses = {
  primary: 'text-gray-900 dark:text-white',
  secondary: 'text-gray-700 dark:text-gray-200',
  muted: 'text-gray-600 dark:text-gray-300',
  accent: 'text-indigo-600 dark:text-indigo-400'
};

export default function Title({ 
  children, 
  level = 2,
  size,
  weight = 'semibold',
  color = 'primary',
  className = ""
}: TitleProps) {
  // 기본 크기를 level에 따라 설정
  const defaultSize = size || (['3xl', '2xl', 'xl', 'lg', 'md', 'sm'][level - 1] as keyof typeof sizeClasses);
  
  const tag = `h${level}`;
  
  return createElement(tag, {
    className: `
      ${sizeClasses[defaultSize]}
      ${weightClasses[weight]}
      ${colorClasses[color]}
      ${className}
    `
  }, children);
} 