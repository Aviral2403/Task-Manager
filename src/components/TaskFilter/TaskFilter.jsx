import React, { useState } from 'react';
import './TaskFilter.css';

const TaskFilter = ({ activeFilter, onFilterChange, taskCounts, darkMode, onSearch, onAddTask }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className={`task-filter ${darkMode ? 'dark' : ''}`}>
      <div className="task-filter-content">
        <div className="task-filter-tabs">
          <button
            className={`task-filter-tab ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => onFilterChange('all')}
          >
            All <span className="task-count">{taskCounts.all}</span>
          </button>
          <button
            className={`task-filter-tab ${activeFilter === 'pending' ? 'active' : ''}`}
            onClick={() => onFilterChange('pending')}
          >
            In Progress <span className="task-count">{taskCounts.pending}</span>
          </button>
          <button
            className={`task-filter-tab ${activeFilter === 'completed' ? 'active' : ''}`}
            onClick={() => onFilterChange('completed')}
          >
            Completed <span className="task-count">{taskCounts.completed}</span>
          </button>
        </div>
        
        <div className="task-search-container">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="task-search-input"
          />
          <span className="task-search-icon">🔍</span>
        </div>
      </div>
      <button 
        className="task-add-button"
        onClick={onAddTask}
      >
        + New Task
      </button>
    </div>
  );
};

export default TaskFilter;