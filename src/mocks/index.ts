// This file is for initializing MSW in the browser environment
import { worker } from './browser';

// Initialize MSW in browser
async function initializeMocks() {
  if (process.env.NODE_ENV === 'development') {
    return worker.start({
      onUnhandledRequest: 'bypass', // Bypass requests that are not handled by MSW
    })
      .then(() => {
        console.log('[MSW] Mock Service Worker initialized');
      })
      .catch((error) => {
        console.error('[MSW] Failed to initialize:', error);
      });
  }

  return Promise.resolve();
}

export { initializeMocks };
