/**
 * Initialize Mock Service Worker in the browser
 * This module only runs in development mode
 */

async function initMocks() {
  if (process.env.NODE_ENV === 'development') {
    // Dynamically import MSW to avoid it being included in production build
    const { worker } = await import('./browser');

    // Start the worker
    await worker.start({
      onUnhandledRequest: 'bypass', // Bypass requests that are not handled by MSW
    });

    console.log('[MSW] Mock Service Worker initialized');
  }
}

export { initMocks };
