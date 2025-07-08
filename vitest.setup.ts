import { afterAll, afterEach, beforeAll } from 'vitest';

import { server } from './src/mocks/node';

beforeAll(() => {
  server.listen();
  console.log('[MSW] Server started');
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
