import React from 'react';
import { removeLocalStorage } from '../../utils/localStorage';
import './Navbar.css';

const Navbar = ({ username, onLogout, darkMode, toggleDarkMode }) => {
  const handleLogout = () => {
    removeLocalStorage('currentUser');
    onLogout();
  };

  return (
    <nav className={`navbar ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <h1 className="navbar-logo">Task Manager</h1>
        </div>
        <div className="navbar-right">
          <button 
            className="navbar-dark-mode-toggle" 
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <div className="navbar-user">
            <button 
              className="navbar-logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;