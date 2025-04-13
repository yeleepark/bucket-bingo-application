import { setupWorker } from 'msw';
import { bingoHandlers } from './handlers/bingo';

// Combine all handlers
const handlers = [...bingoHandlers];

// Setup MSW worker
export const worker = setupWorker(...handlers);
