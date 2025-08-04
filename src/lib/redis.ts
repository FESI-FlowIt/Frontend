import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
  // 재시도 설정
  retry: {
    retries: 3,
    backoff: retryCount => Math.exp(retryCount) * 50,
  },
  // 자동 직렬화/역직렬화 활성화
  automaticDeserialization: true,
});
