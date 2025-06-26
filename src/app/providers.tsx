'use client';

import { QueryProvider } from '@/shared/api/query/query-provider';
import { useEffect, useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isMswReady, setIsMswReady] = useState(false);

  useEffect(() => {
    const initMsw = async () => {
      console.log('🔧 MSW 초기화 시작...');
      
      if (typeof window !== 'undefined') {
        try {
          const { setupWorker } = await import('msw/browser');
          const { handlers } = await import('@/mocks/handlers');
          
          const worker = setupWorker(...handlers);
          
          await worker.start({
            onUnhandledRequest: 'warn',
            serviceWorker: {
              url: '/mockServiceWorker.js'
            }
          });
          
          console.log('✅ MSW initialized!');
          setIsMswReady(true);
        } catch (error) {
          console.error('❌ MSW failed to initialize:', error);
          setIsMswReady(true); // 에러가 있어도 앱은 계속 실행
        }
      } else {
        console.log('🖥️ Server-side rendering - skipping MSW');
        setIsMswReady(true);
      }
    };

    initMsw();
  }, []);

  if (!isMswReady) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-2"></div>
          <p className="text-sm text-gray-600">API mocks 초기화 중...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
