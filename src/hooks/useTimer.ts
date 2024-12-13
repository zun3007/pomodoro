import { useState, useEffect } from 'react';
import { TimerMode } from '../types';
import { TIMER_DURATIONS } from '../constants/timerConfig';

interface UseTimerProps {
  mode: TimerMode;
  onComplete?: () => void;
}

export function useTimer({ mode, onComplete }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS[mode]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setTimeLeft(TIMER_DURATIONS[mode]);
  }, [mode]);

  useEffect(() => {
    let interval: number;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      onComplete?.();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, onComplete]);

  const start = () => setIsActive(true);
  const pause = () => setIsActive(false);
  const reset = () => {
    setIsActive(false);
    setTimeLeft(TIMER_DURATIONS[mode]);
  };

  return {
    timeLeft,
    isActive,
    start,
    pause,
    reset,
  };
}
