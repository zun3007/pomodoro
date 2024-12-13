import { useState } from 'react';
import Logo from './components/Logo/Logo';
import Timer from './components/Timer/Timer';
import Tasks from './components/Tasks/Tasks';
import { TimerMode } from './types';
import './App.css';

function App() {
  const [timerMode, setTimerMode] = useState<TimerMode>('pomodoro');

  return (
    <>
      <a href='#main' className='skip-to-main'>
        Skip to main content
      </a>
      <div className='app' data-mode={timerMode}>
        <header>
          <Logo />
        </header>
        <main id='main'>
          <Timer mode={timerMode} onModeChange={setTimerMode} />
          <Tasks />
        </main>
      </div>
    </>
  );
}

export default App;
