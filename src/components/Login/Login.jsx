import React, { useState } from 'react';
import { setLocalStorage } from '../../utils/localStorage';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setLocalStorage('currentUser', username);
      onLogin(username);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to Task Tracker</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
              placeholder="Enter your username"
              required
              autoFocus
            />
          </div>
          <button type="submit" className="login-button">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;