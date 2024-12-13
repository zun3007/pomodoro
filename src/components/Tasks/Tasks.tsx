import { useState } from 'react';
import './Tasks.css';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [editingTask, setEditingTask] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.trim(),
      completed: false,
    };

    setTasks([...tasks, task]);
    setIsAdding(false);
    setNewTask('');
  };

  const toggleComplete = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const startEditing = (taskId: string, title: string) => {
    setEditingTask(taskId);
    setNewTask(title);
  };

  const updateTask = (taskId: string) => {
    if (!newTask.trim()) return;

    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, title: newTask.trim() } : task
      )
    );
    setEditingTask(null);
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
              onClick={() => {
                setIsAdding(false);
                setNewTask('');
              }}
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

      <div className='task-list'>
        {tasks.map((task) => (
          <div key={task.id} className='task-item'>
            {editingTask === task.id ? (
              <div className='task-edit'>
                <input
                  type='text'
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  autoFocus
                />
                <div className='task-actions'>
                  <button
                    onClick={() => {
                      setEditingTask(null);
                      setNewTask('');
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={() => updateTask(task.id)}>Save</button>
                </div>
              </div>
            ) : (
              <div className='task-content'>
                <input
                  type='checkbox'
                  checked={task.completed}
                  onChange={() => toggleComplete(task.id)}
                />
                <span
                  style={{
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </span>
                <div className='task-actions'>
                  <button onClick={() => startEditing(task.id, task.title)}>
                    Edit
                  </button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tasks;
