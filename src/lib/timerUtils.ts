export const formatTime = (totalSeconds: number) => {
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return { hours, minutes, seconds };
};

export const getCurrentSeconds = (minutes: number, seconds: number) => minutes * 60 + seconds;

export const getTotalElapsedSeconds = (currentSeconds: number, accumulatedSeconds: number) =>
  currentSeconds + accumulatedSeconds;
