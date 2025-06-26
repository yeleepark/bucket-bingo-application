import Link from 'next/link';
import { ReactNode } from 'react';

interface HeaderProps {
  title?: string;
  titleHref?: string;
  actions?: ReactNode;
  className?: string;
}

export default function Header({ 
  title = "연간 빙고",
  titleHref = "/",
  actions,
  className = ""
}: HeaderProps) {
  return (
    <header className={`
      flex items-center justify-between py-4
      ${className}
    `}>
      <div className="flex items-center gap-2">
        <Link 
          href={titleHref} 
          className="text-indigo-600 dark:text-indigo-400 font-bold text-2xl hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
        >
          {title}
        </Link>
      </div>
      {actions && (
        <div className="flex items-center gap-4">
          {actions}
        </div>
      )}
    </header>
  );
} 