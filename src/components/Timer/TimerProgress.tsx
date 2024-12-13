import { useEffect, useState } from 'react';
import './TimerProgress.css';

interface TimerProgressProps {
  timeLeft: number;
  totalTime: number;
  mode: 'pomodoro' | 'shortBreak' | 'longBreak';
}

function TimerProgress({ timeLeft, totalTime, mode }: TimerProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const percentage = ((totalTime - timeLeft) / totalTime) * 100;
    setProgress(percentage);
  }, [timeLeft, totalTime]);

  return (
    <div className='timer-progress' data-mode={mode}>
      <svg viewBox='0 0 100 100' className='timer-progress-circle'>
        {/* Background circle */}
        <circle cx='50' cy='50' r='45' className='timer-progress-background' />
        {/* Progress circle */}
        <circle
          cx='50'
          cy='50'
          r='45'
          className='timer-progress-indicator'
          style={{
            strokeDasharray: `${2 * Math.PI * 45}`,
            strokeDashoffset: `${2 * Math.PI * 45 * (1 - progress / 100)}`,
          }}
        />
      </svg>
    </div>
  );
}

export default TimerProgress;
