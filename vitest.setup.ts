import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './src/mocks/server';

beforeAll(() => {
  server.listen();
  console.log('[MSW] Server started');
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
