import { describe, expect, it } from 'vitest';

describe('MSW 테스트 예시', () => {
  it('responds with the user', async () => {
    const response = await fetch('https://api.example.com/user');

    await expect(response.json()).resolves.toEqual({
      id: 'abc-123',
      firstName: 'John',
      lastName: 'Maverick',
    });
  });
});
