import React from 'react';
import CardTitle from './CardTitle';

type CardHeaderProps = {
  title: React.ReactNode;
  badge?: React.ReactNode;
  className?: string;
};

const CardHeader = ({ title, badge, className = '' }: CardHeaderProps) => {
  return (
    <div className={`flex justify-between items-center mb-2 ${className}`}>
      <CardTitle>{title}</CardTitle>
      {badge && badge}
    </div>
  );
};

export default CardHeader;
