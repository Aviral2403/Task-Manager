import React from 'react';
import { format } from 'date-fns';
import './TaskItem.css';

const TaskItem = ({ task, onToggleComplete, onEdit, onDelete, onView, darkMode }) => {
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

  const getChecklistProgress = () => {
    if (task.completed) return `${task.checklist?.length || 1}/${task.checklist?.length || 1}`;
    if (!task.checklist || task.checklist.length === 0) return task.completed ? '1/1' : '0/1';
    const completed = task.checklist.filter(item => item.completed).length;
    return `${completed}/${task.checklist.length}`;
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${darkMode ? 'dark' : ''}`}>
      <div className="task-item-header">
        <div className="task-item-checkbox">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="task-item-checkbox-input"
          />
        </div>
        <div className="task-item-title-wrapper">
          <h3 className="task-item-title">{task.title}</h3>
          {task.priority && (
            <span 
              className="task-item-priority"
              style={{ backgroundColor: priorityColors[task.priority] }}
            >
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
            </span>
          )}
        </div>
        <div className="task-item-days-left">
          {task.dueDate && (
            <span className={`task-item-days-left-text ${isPastDue ? 'past-due' : ''}`}>
              {getDaysLeft(task.dueDate)}
            </span>
          )}
        </div>
      </div>
      
      {task.description && (
        <p className="task-item-description">{task.description}</p>
      )}
      
      <div className="task-item-footer">
        <div className="task-item-tags">
          {task.tags?.map(tag => (
            <span
              key={tag.name}
              className="task-item-tag"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </span>
          ))}
        </div>
        
        <div className="task-item-checklist-progress">
          <div className="task-item-progress-bar">
            <div 
              className="task-item-progress-fill"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <span className="task-item-checklist-progress-text">
            {getChecklistProgress()}
          </span>
        </div>
      </div>
      
      <div className="task-item-actions">
        <button 
          onClick={() => onView(task)} 
          className="task-item-view-button"
        >
          View
        </button>
        <button 
          onClick={() => onEdit(task)} 
          className="task-item-edit-button"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(task.id)} 
          className="task-item-delete-button"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;