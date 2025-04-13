import React from 'react';

type CardFooterProps = {
  children: React.ReactNode;
  className?: string;
};

const CardFooter = ({ children, className = '' }: CardFooterProps) => {
  return <div className={`mt-4 ${className}`}>{children}</div>;
};

export default CardFooter;
