import React, { useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from './utils/localStorage';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import TaskList from './components/TaskList/TaskList';
import TaskFilter from './components/TaskFilter/TaskFilter';
import Modal from './components/Modal/Modal';
import TaskForm from './components/TaskForm/TaskForm';
import TaskView from './components/TaskView/TaskView';
import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToView, setTaskToView] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const user = getLocalStorage('currentUser');
    if (user) {
      setCurrentUser(user);
      loadUserTasks(user);
    }

    const savedTheme = getLocalStorage('darkMode');
    if (savedTheme !== null) {
      setDarkMode(savedTheme);
      document.body.classList.toggle('dark', savedTheme);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      setLocalStorage(`tasks_${currentUser}`, tasks);
    }
    filterTasks(activeFilter, '');
  }, [tasks, currentUser, activeFilter]);

  const loadUserTasks = (username) => {
    const userTasks = getLocalStorage(`tasks_${username}`) || [];
    setTasks(userTasks);
    setFilteredTasks(userTasks);
  };

  const handleSearch = (query) => {
    filterTasks(activeFilter, query);
  };

  const filterTasks = (filter, searchQuery) => {
    let filtered = tasks;

    // Apply filter
    switch (filter) {
      case 'completed':
        filtered = filtered.filter(task => task.completed);
        break;
      case 'pending':
        filtered = filtered.filter(task => !task.completed);
        break;
      default:
        filtered = filtered;
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(query) || 
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    setFilteredTasks(filtered);
  };

  const handleLogin = (username) => {
    setCurrentUser(username);
    loadUserTasks(username);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setTasks([]);
    setFilteredTasks([]);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setLocalStorage('darkMode', newDarkMode);
    document.body.classList.toggle('dark', newDarkMode);
  };

  const handleAddTask = () => {
    setTaskToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
    setIsModalOpen(true);
  };

  const handleViewTask = (task) => {
    setTaskToView(task);
    setIsViewModalOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (taskToEdit) {
      setTasks(tasks.map(task => 
        task.id === taskData.id ? taskData : task
      ));
    } else {
      setTasks([...tasks, taskData]);
    }
    setIsModalOpen(false);
  };

  const handleToggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleToggleChecklistItem = (taskId, itemId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedChecklist = task.checklist?.map(item => 
          item.id === itemId ? { ...item, completed: !item.completed } : item
        ) || [];
        const allCompleted = updatedChecklist.length > 0 && updatedChecklist.every(item => item.completed);
        return {
          ...task,
          checklist: updatedChecklist,
          completed: allCompleted
        };
      }
      return task;
    }));
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length
  };

  if (!currentUser) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className={`app-container ${darkMode ? 'dark' : ''}`}>
      <Navbar 
        username={currentUser} 
        onLogout={handleLogout} 
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onAddTask={handleAddTask}
      />
      
      <main className="main-content">
        <TaskFilter 
          activeFilter={activeFilter} 
          onFilterChange={setActiveFilter}
          taskCounts={taskCounts}
          darkMode={darkMode}
          onSearch={handleSearch}
        />

        <TaskList 
          tasks={filteredTasks} 
          onToggleComplete={handleToggleComplete}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
          onView={handleViewTask}
          darkMode={darkMode}
        />

        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          darkMode={darkMode}
        >
          <TaskForm 
            taskToEdit={taskToEdit}
            onSubmit={handleSaveTask}
            onCancel={() => setIsModalOpen(false)}
            darkMode={darkMode}
          />
        </Modal>

        <Modal 
          isOpen={isViewModalOpen} 
          onClose={() => setIsViewModalOpen(false)}
          darkMode={darkMode}
          wide
        >
          {taskToView && (
            <TaskView 
              task={taskToView}
              onToggleChecklistItem={handleToggleChecklistItem}
              darkMode={darkMode}
            />
          )}
        </Modal>
      </main>
    </div>
  );
};

export default App;