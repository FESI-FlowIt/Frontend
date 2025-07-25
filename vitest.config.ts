import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    projects: [
      // 1) Storybook 테스트 전용 프로젝트
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(dirname, '.storybook') })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
          // **test.include는 제거하세요** (Storybook 플러그인이 무시함)
          // include: [],
        },
      },
      // 2) MSW 테스트 및 일반 테스트 전용 프로젝트
      {
        test: {
          include: ['src/mocks/tests/*.test.ts', 'src/**/*.test.ts'], // MSW 테스트 파일 경로 포함
          setupFiles: ['./vitest.setup.ts'], // MSW 서버 시작/종료 셋업
          environment: 'node', // 혹은 jsdom, 테스트환경에 맞게
        },
      },
    ],
  },
});
