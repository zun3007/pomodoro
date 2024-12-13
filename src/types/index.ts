export interface Task {
  id: number;
  text: string;
  completed: boolean;
  estimatedPomodoros: number;
}

export type TimerMode = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
}
