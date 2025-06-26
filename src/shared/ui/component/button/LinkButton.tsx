import Link from 'next/link';
import { ReactNode } from 'react';

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
}

const variantClasses = {
  primary: 'bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-600',
  secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600',
  ghost: 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
};

export default function LinkButton({ 
  href,
  children, 
  variant = 'ghost',
  size = 'md',
  icon,
  className = ""
}: LinkButtonProps) {
  return (
    <Link 
      href={href}
      className={`
        inline-flex items-center gap-2 
        rounded-lg font-medium
        transition-colors duration-150
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {icon}
      {children}
    </Link>
  );
} 