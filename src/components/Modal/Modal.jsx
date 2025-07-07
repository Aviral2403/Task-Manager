import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, children, darkMode, wide }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${darkMode ? 'dark' : ''}`}>
      <div className={`modal-content ${darkMode ? 'dark' : ''} ${wide ? 'wide' : ''}`}>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;