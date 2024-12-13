import { useState } from 'react';
import './Tasks.css';

function Tasks() {
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add task logic here
    setIsAdding(false);
    setNewTask('');
  };

  return (
    <div className='tasks'>
      <header className='tasks-header'>
        <h2>Tasks</h2>
      </header>

      {isAdding ? (
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            className='task-input'
            placeholder='What are you working on?'
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            autoFocus
          />
          <div className='form-actions'>
            <button
              type='button'
              className='cancel'
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
            <button type='submit' className='save'>
              Save
            </button>
          </div>
        </form>
      ) : (
        <button
          className='task-input'
          onClick={() => setIsAdding(true)}
          aria-label='Add new task'
        >
          What are you working on?
        </button>
      )}

      <div className='task-list'>{/* Task items will be rendered here */}</div>
    </div>
  );
}

export default Tasks;
