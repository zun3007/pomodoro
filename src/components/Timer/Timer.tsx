import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import { TimerMode } from '../../types';
import { TIMER_DURATIONS, TIMER_LABELS } from '../../constants/timerConfig';
import './Timer.css';
import { useSound } from '../../hooks/useSound';

interface TimerProps {
  mode: TimerMode;
  onModeChange: (mode: TimerMode) => void;
}

function Timer({ mode, onModeChange }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATIONS[mode]);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { playClick, playSuccess, playTimerComplete } = useSound();

  // Reset timer when mode changes
  useEffect(() => {
    setTimeLeft(TIMER_DURATIONS[mode]);
    setIsActive(false);
  }, [mode]);

  useEffect(() => {
    let interval: number;
    let audio: HTMLAudioElement;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      audio = new Audio(
        'https://actions.google.com/sounds/v1/alarms/dinner_bell_triangle.ogg'
      );
      audio.volume = 0.4;
      audio.play().catch(console.log);
      setIsActive(false);
      setIsComplete(true);
    }

    return () => {
      clearInterval(interval);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleModeChange = (newMode: TimerMode) => {
    playClick();
    onModeChange(newMode);
  };

  const handleStart = () => {
    playClick();
    setIsActive(true);
  };

  const handlePause = () => {
    playClick();
    setIsActive(false);
  };

  const handleStop = () => {
    playClick();
    setIsActive(false);
    setTimeLeft(TIMER_DURATIONS[mode]);
  };

  const handleSkip = () => {
    playSuccess();
    setIsActive(false);
    const nextMode = {
      pomodoro: 'shortBreak',
      shortBreak: 'pomodoro',
      longBreak: 'pomodoro',
    }[mode] as TimerMode;

    onModeChange(nextMode);
    setTimeLeft(TIMER_DURATIONS[nextMode]);
  };

  const handleReset = () => {
    playClick();
    setTimeLeft(TIMER_DURATIONS[mode]);
    setIsComplete(false);
  };

  return (
    <div className='timer' role='region' aria-label='Timer controls'>
      <div className='timer-modes' role='tablist'>
        <button
          role='tab'
          className={mode === 'pomodoro' ? 'active' : ''}
          onClick={() => handleModeChange('pomodoro')}
          aria-selected={mode === 'pomodoro'}
        >
          Pomodoro
        </button>
        <button
          role='tab'
          className={mode === 'shortBreak' ? 'active' : ''}
          onClick={() => handleModeChange('shortBreak')}
          aria-selected={mode === 'shortBreak'}
        >
          Short Break
        </button>
        <button
          role='tab'
          className={mode === 'longBreak' ? 'active' : ''}
          onClick={() => handleModeChange('longBreak')}
          aria-selected={mode === 'longBreak'}
        >
          Long Break
        </button>
      </div>

      <div
        className='time-display'
        role='timer'
        aria-label={`${formatTime(timeLeft)} remaining`}
        aria-live='polite'
      >
        {formatTime(timeLeft)}
      </div>

      <p className='timer-label' aria-live='polite'>
        {TIMER_LABELS[mode]}
      </p>

      <div className='timer-controls'>
        {isComplete ? (
          <Button onClick={handleReset} className='reset-button'>
            Reset
          </Button>
        ) : !isActive ? (
          <Button onClick={handleStart}>Start</Button>
        ) : (
          <>
            <Button
              onClick={handleStop}
              aria-label='Stop timer'
              className='icon-button'
            >
              ◼
            </Button>
            <Button onClick={handlePause}>Pause</Button>
            <Button
              onClick={handleSkip}
              aria-label='Skip to next timer'
              className='icon-button'
            >
              ⏭
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Timer;
