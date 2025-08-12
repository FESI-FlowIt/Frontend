import { useCallback, useEffect, useRef, useState } from 'react';

import { timerApi } from '@/api/timerApi';

function hmsToSec(hms: string | null | undefined) {
  const [h = '0', m = '0', s = '0'] = (hms ?? '00:00:00').split(':');
  return (+h || 0) * 3600 + (+m || 0) * 60 + (+s || 0);
}

type RefetchOptions = { force?: boolean };

export function useTotalRunningTime(todoId: number | null) {
  const [totalHHMMSS, setTotalHHMMSS] = useState<string>('00:00:00');

  // 이전(최근) 초 값을 ref로 기억해서 비교
  const lastSecRef = useRef<number>(0);

  // todoId가 바뀌면 기준도 리셋 (원하면 여기서 00:00:00 유지)
  useEffect(() => {
    lastSecRef.current = 0;
    setTotalHHMMSS('00:00:00');
  }, [todoId]);

  const refetch = useCallback(
    async (opts?: RefetchOptions) => {
      if (todoId == null) return;

      const res = await timerApi.getTotalRunningTime(todoId);
      const hhmmss = res.totalRunningTime ?? '00:00:00';
      const nextSec = hmsToSec(hhmmss);
      const prevSec = lastSecRef.current;

      // 강제 반영 옵션일 때는 그대로 수용
      if (opts?.force) {
        lastSecRef.current = nextSec;
        setTotalHHMMSS(hhmmss);
        return;
      }

      // 1) 역행이면 무시 (서버 지연/레이스 방지)
      if (nextSec < prevSec) return;

      // 2) 이전이 0이 아닌데 새 값이 0이면 일시적 0으로 보고 무시
      if (nextSec === 0 && prevSec > 0) return;

      // 통과하면 반영
      lastSecRef.current = nextSec;
      setTotalHHMMSS(hhmmss);
    },
    [todoId],
  );

  return { totalHHMMSS, refetch };
}
