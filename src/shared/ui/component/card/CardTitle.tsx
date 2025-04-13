import React from 'react';

type CardTitleProps = {
  children: React.ReactNode;
  className?: string;
};

const CardTitle = ({ children, className = '' }: CardTitleProps) => {
  return <h3 className={`font-medium ${className}`}>{children}</h3>;
};

export default CardTitle;
