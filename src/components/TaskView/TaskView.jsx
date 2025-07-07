import React from 'react';
import { format } from 'date-fns';
import './TaskView.css';

const TaskView = ({ task, onToggleChecklistItem, darkMode }) => {
  const isPastDue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  
  const priorityColors = {
    high: '#ef4444',
    medium: '#f59e0b',
    low: '#10b981'
  };

  const getDaysLeft = (dueDate) => {
    if (!dueDate) return null;
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? `${diffDays} Days left` : 'Past due';
  };

  const getProgressPercentage = () => {
    if (task.completed) return 100;
    if (!task.checklist || task.checklist.length === 0) return 0;
    const completed = task.checklist.filter(item => item.completed).length;
    return Math.round((completed / task.checklist.length) * 100);
  };

  return (
    <div className={`task-view ${darkMode ? 'dark' : ''}`}>
      <div className="task-view-header">
        <h2 className="task-view-title">{task.title}</h2>
        {task.priority && (
          <span 
            className="task-view-priority"
            style={{ backgroundColor: priorityColors[task.priority] }}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </span>
        )}
      </div>

      {task.description && (
        <div className="task-view-description">
          <h3 className="task-view-section-title">Description</h3>
          <p>{task.description}</p>
        </div>
      )}

      <div className="task-view-details">
        <div className="task-view-detail">
          <h3 className="task-view-section-title">Due Date</h3>
          <p>
            {task.dueDate ? (
              <>
                {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                <span className={`task-view-days-left ${isPastDue ? 'past-due' : ''}`}>
                  ({getDaysLeft(task.dueDate)})
                </span>
              </>
            ) : 'No due date'}
          </p>
        </div>

        {task.tags && task.tags.length > 0 && (
          <div className="task-view-detail">
            <h3 className="task-view-section-title">Tags</h3>
            <div className="task-view-tags">
              {task.tags.map(tag => (
                <span
                  key={tag.name}
                  className="task-view-tag"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {task.checklist && task.checklist.length > 0 && (
        <div className="task-view-checklist">
          <div className="task-view-checklist-header">
            <h3 className="task-view-section-title">Checklist</h3>
            <div className="task-view-progress">
              <div className="task-view-progress-bar">
                <div 
                  className="task-view-progress-fill"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <span className="task-view-progress-text">
                {getProgressPercentage()}% ({task.checklist.filter(item => item.completed).length}/{task.checklist.length})
              </span>
            </div>
          </div>
          
          <div className="task-view-checklist-items">
            {task.checklist.map(item => (
              <div key={item.id} className="task-view-checklist-item">
                <input
                  type="checkbox"
                  checked={task.completed ? true : item.completed}
                  onChange={() => onToggleChecklistItem(task.id, item.id)}
                  className="task-view-checklist-checkbox"
                />
                <span className={`task-view-checklist-text ${(task.completed || item.completed) ? 'completed' : ''}`}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskView;