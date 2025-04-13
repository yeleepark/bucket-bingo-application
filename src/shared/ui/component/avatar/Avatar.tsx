import React from 'react';

type AvatarProps = {
  name: string;
  bgColor?: string;
  textColor?: string;
  size?: 'sm' | 'md' | 'lg';
};

const Avatar = ({
  name,
  bgColor = 'bg-indigo-100',
  textColor = 'text-indigo-600',
  size = 'md'
}: AvatarProps) => {
  const initial = name.charAt(0);

  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-14 h-14 text-base',
    lg: 'w-20 h-20 text-xl',
  };

  return (
    <div className={`rounded-full overflow-hidden ${sizeClasses[size]}`}>
      <div className={`${sizeClasses[size]} ${bgColor} flex items-center justify-center`}>
        <span className={`${textColor} font-medium`}>{initial}</span>
      </div>
    </div>
  );
}

export default Avatar;
