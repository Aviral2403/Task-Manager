import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, onToggleComplete, onEdit, onDelete, onView, darkMode }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayTasks = tasks.filter(task => task.dueDate === today);
  const otherTasks = tasks.filter(task => task.dueDate !== today);

  return (
    <div className={`task-list ${darkMode ? 'dark' : ''}`}>
      {todayTasks.length > 0 ? (
        <div className="task-list-section">
          <h2 className="task-list-section-title">Today's Tasks</h2>
          <div className="task-list-grid">
            {todayTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="task-list-no-tasks">
          <p>No tasks for today</p>
        </div>
      )}

      {otherTasks.length > 0 ? (
        <div className="task-list-section">
          <h2 className="task-list-section-title">All Tasks</h2>
          <div className="task-list-grid">
            {otherTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={onToggleComplete}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      ) : tasks.length > 0 && todayTasks.length > 0 ? null : (
        <div className="task-list-no-tasks">
          <p>No tasks found</p>
        </div>
      )}
    </div>
  );
};

export default TaskList;