import { useEffect, useState } from 'react';

export function useTimerControl() {
  const [isRunning, setIsRunning] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [accumulatedSeconds, setAccumulatedSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setSeconds(prev => {
        if (prev === 59) {
          setMinutes(min => min + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => {
    
    setIsRunning(false);
  };
  const handleStop = () => {
    setAccumulatedSeconds(prev => prev + minutes * 60 + seconds);
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
  };

  return {
    isRunning,
    minutes,
    seconds,
    accumulatedSeconds,
    handleStart,
    handlePause,
    handleStop,
    setMinutes, 
    setSeconds, 
    setAccumulatedSeconds, 
  };
}
