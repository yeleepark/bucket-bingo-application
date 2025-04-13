import React from 'react';
import Link from 'next/link';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
};

const Card = ({ children, className = '', href, onClick }: CardProps) => {
  const baseClasses = `p-5 border border-gray-200 rounded-lg hover:border-indigo-500 transition-colors ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div className={`${baseClasses} cursor-pointer`} onClick={onClick}>
        {children}
      </div>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}

export default Card;
