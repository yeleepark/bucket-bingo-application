import { ReactNode } from 'react';

interface TextProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'accent' | 'error' | 'success';
  align?: 'left' | 'center' | 'right';
  as?: 'p' | 'span' | 'div';
  className?: string;
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl'
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
  accent: 'text-indigo-600 dark:text-indigo-400',
  error: 'text-red-600 dark:text-red-400',
  success: 'text-green-600 dark:text-green-400'
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};

export default function Text({ 
  children, 
  size = 'md',
  weight = 'normal',
  color = 'primary',
  align = 'left',
  as = 'p',
  className = ""
}: TextProps) {
  const Component = as;
  
  return (
    <Component className={`
      ${sizeClasses[size]}
      ${weightClasses[weight]}
      ${colorClasses[color]}
      ${alignClasses[align]}
      ${className}
    `}>
      {children}
    </Component>
  );
} 