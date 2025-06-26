import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'card' | 'bordered';
  className?: string;
}

const variantClasses = {
  default: '',
  card: 'p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm',
  bordered: 'p-6 bg-gray-50 dark:bg-gray-800 rounded-xl'
};

export default function Section({ 
  children, 
  title, 
  subtitle,
  variant = 'default',
  className = ""
}: SectionProps) {
  return (
    <section className={`
      ${variantClasses[variant]}
      ${className}
    `}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
} 