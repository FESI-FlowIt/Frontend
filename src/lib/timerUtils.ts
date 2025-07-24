// 초를 시/분/초 형식의 문자열로 변환
export const formatTime = (totalSeconds: number) => {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return { hours, minutes, seconds };
};

// 분과 초를 총 초로 변환
export const getCurrentSeconds = (minutes: number, seconds: number) => minutes * 60 + seconds;

// 현재 초와 누적 초를 더해 총 경과 시간 계산
export const getTotalElapsedSeconds = (
  currentSeconds: number,
  accumulatedSeconds: number
) => currentSeconds + accumulatedSeconds;
