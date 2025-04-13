import React from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
  secondary: 'bg-black text-white hover:bg-gray-800',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  ghost: 'text-gray-600 hover:bg-gray-100',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5 rounded-lg',
  md: 'px-4 py-2 rounded-lg',
  lg: 'px-5 py-3 rounded-lg text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  className = '',
  icon,
  onClick,
}: ButtonProps) => {
  const baseClasses = `inline-flex items-center justify-center font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
