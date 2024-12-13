import { TimerMode } from '../types';

export const TIMER_DURATIONS: Record<TimerMode, number> = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

export const TIMER_LABELS: Record<TimerMode, string> = {
  pomodoro: 'Time to focus!',
  shortBreak: 'Time for a break!',
  longBreak: 'Time for a break!',
};
