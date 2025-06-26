interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  submessage?: string;
  className?: string;
}

const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-16 w-16', 
  lg: 'h-32 w-32'
};

export default function LoadingSpinner({ 
  size = 'lg',
  message = "로딩 중...",
  submessage,
  className = ""
}: LoadingSpinnerProps) {
  return (
    <div className={`
      flex items-center justify-center min-h-screen 
      bg-white dark:bg-gray-900
      ${className}
    `}>
      <div className="text-center">
        <div className={`
          animate-spin rounded-full border-b-2 border-indigo-600 mb-4 mx-auto
          ${sizeClasses[size]}
        `}></div>
        <p className="text-gray-600 dark:text-gray-300">
          {message}
        </p>
        {submessage && (
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            {submessage}
          </p>
        )}
      </div>
    </div>
  );
} 