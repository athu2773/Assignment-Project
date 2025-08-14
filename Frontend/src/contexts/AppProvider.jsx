import React, { useState } from 'react';
import { AppContext } from './AppContext';

export const AppProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  
  const addNotification = (message, severity = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      severity,
    };
    
    setNotifications(prev => [...prev, newNotification]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  return (
    <AppContext.Provider value={{ notifications, addNotification }}>
      {children}
    </AppContext.Provider>
  );
};
