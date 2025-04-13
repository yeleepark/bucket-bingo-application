'use client';

import { ReactNode, useEffect, useState } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  const [isMswReady, setIsMswReady] = useState(false);

  useEffect(() => {
    // Only initialize MSW in development and browser environment
    async function initMsw() {
      if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
        try {
          const { initializeMocks } = await import('@/mocks/index');
          await initializeMocks();
          console.log('[MSW] Initialized successfully');
        } catch (error) {
          console.error('[MSW] Failed to initialize:', error);
        } finally {
          setIsMswReady(true);
        }
      } else {
        setIsMswReady(true);
      }
    }

    initMsw();
  }, []);

  // Show loading state while MSW is initializing in development
  if (!isMswReady && process.env.NODE_ENV === 'development') {
    return <div className="flex items-center justify-center min-h-screen">Initializing API mocks...</div>;
  }

  return <>{children}</>;
}
