import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ taskToEdit, onSubmit, onCancel, darkMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    tags: [],
    checklist: [],
    tagInput: '',
    tagColor: '#6b7280'
  });

  const [customTag, setCustomTag] = useState({
    name: '',
    color: '#6b7280'
  });

  const [checklistItem, setChecklistItem] = useState('');
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        priority: taskToEdit.priority || 'medium',
        dueDate: taskToEdit.dueDate || '',
        tags: taskToEdit.tags || [],
        checklist: taskToEdit.checklist || [],
        tagInput: '',
        tagColor: '#6b7280'
      });
    }
  }, [taskToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTagChange = (e) => {
    const { name, value } = e.target;
    setCustomTag(prev => ({ ...prev, [name]: value }));
  };

  const addTag = (tagType) => {
    if (tagType === 'work') {
      if (!formData.tags.some(tag => tag.name === 'work')) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, { name: 'work', color: '#10b981' }]
        }));
      }
    } else if (tagType === 'personal') {
      if (!formData.tags.some(tag => tag.name === 'personal')) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, { name: 'personal', color: '#ef4444' }]
        }));
      }
    }
  };

  const addCustomTag = () => {
    if (customTag.name.trim() && !formData.tags.some(tag => tag.name === customTag.name)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, { name: customTag.name, color: customTag.color }]
      }));
      setCustomTag({ name: '', color: '#6b7280' });
    }
  };

  const removeTag = (tagName) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag.name !== tagName)
    }));
  };

  const addChecklistItem = () => {
    if (checklistItem.trim()) {
      setFormData(prev => ({
        ...prev,
        checklist: [...prev.checklist, {
          id: Date.now().toString(),
          text: checklistItem,
          completed: false
        }]
      }));
      setChecklistItem('');
    }
  };

  const removeChecklistItem = (itemId) => {
    setFormData(prev => ({
      ...prev,
      checklist: prev.checklist.filter(item => item.id !== itemId)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const taskData = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      dueDate: formData.dueDate,
      tags: formData.tags,
      checklist: formData.checklist,
      completed: taskToEdit ? taskToEdit.completed : false,
      createdAt: taskToEdit ? taskToEdit.createdAt : new Date().toISOString(),
      id: taskToEdit ? taskToEdit.id : Date.now().toString()
    };

    onSubmit(taskData);
  };

  return (
    <div className={`task-form-container ${darkMode ? 'dark' : ''}`}>
      <h2 className="task-form-title">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="task-form-group">
          <label htmlFor="title" className="task-form-label">Title*</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="task-form-input"
            required
            autoFocus
          />
        </div>

        <div className="task-form-group">
          <label htmlFor="description" className="task-form-label">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="task-form-textarea"
            rows="3"
          />
        </div>

        <div className="task-form-row">
          <div className="task-form-group">
            <label htmlFor="priority" className="task-form-label">Priority</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="task-form-select"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="task-form-group">
            <label htmlFor="dueDate" className="task-form-label">Due Date</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="task-form-input"
            />
          </div>
        </div>

        <div className="task-form-group">
          <label className="task-form-label">Tags</label>
          <div className="task-form-tag-buttons">
            <button 
              type="button" 
              onClick={() => addTag('work')} 
              className="task-form-tag-button work"
            >
              Work
            </button>
            <button 
              type="button" 
              onClick={() => addTag('personal')} 
              className="task-form-tag-button personal"
            >
              Personal
            </button>
          </div>

          <div className="task-form-custom-tag">
            <input
              type="text"
              name="name"
              value={customTag.name}
              onChange={handleTagChange}
              placeholder="Custom tag name"
              className="task-form-tag-input"
            />
            <input
              type="color"
              name="color"
              value={customTag.color}
              onChange={handleTagChange}
              className="task-form-color-input"
            />
            <button 
              type="button" 
              onClick={addCustomTag} 
              className="task-form-add-tag-button"
            >
              Add Tag
            </button>
          </div>

          <div className="task-form-tags-container">
            {formData.tags.map(tag => (
              <span
                key={tag.name}
                className="task-form-tag"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
                <button
                  type="button"
                  onClick={() => removeTag(tag.name)}
                  className="task-form-tag-remove"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="task-form-group">
          <label className="task-form-label">Checklist</label>
          <button
            type="button"
            onClick={() => setIsChecklistModalOpen(true)}
            className="task-form-checklist-button"
          >
            {formData.checklist.length > 0 ? (
              `Edit Checklist`
            ) : (
              'Add Checklist'
            )}
          </button>
        </div>

        <div className="task-form-buttons">
          <button type="button" onClick={onCancel} className="task-form-cancel">
            Cancel
          </button>
          <button type="submit" className="task-form-submit">
            {taskToEdit ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>

      {isChecklistModalOpen && (
        <div className="task-form-checklist-modal">
          <div className="task-form-checklist-modal-content">
            <div className="task-form-checklist-modal-header">
              <h3>Task Checklist</h3>
              <button
                onClick={() => setIsChecklistModalOpen(false)}
                className="task-form-checklist-modal-close"
              >
                &times;
              </button>
            </div>
            <div className="task-form-checklist-modal-body">
              <div className="task-form-checklist-input-container">
                <input
                  type="text"
                  value={checklistItem}
                  onChange={(e) => setChecklistItem(e.target.value)}
                  placeholder="Add checklist item"
                  className="task-form-checklist-input"
                />
                <button
                  type="button"
                  onClick={addChecklistItem}
                  className="task-form-checklist-add-button"
                >
                  Add
                </button>
              </div>
              <div className="task-form-checklist-items">
                {formData.checklist.map(item => (
                  <div key={item.id} className="task-form-checklist-item">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => {}}
                      className="task-form-checklist-checkbox"
                    />
                    <span className="task-form-checklist-text">{item.text}</span>
                    <button
                      type="button"
                      onClick={() => removeChecklistItem(item.id)}
                      className="task-form-checklist-remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="task-form-checklist-modal-footer">
              <button
                onClick={() => setIsChecklistModalOpen(false)}
                className="task-form-checklist-modal-done"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;