// SwitchContext.js
import React, { createContext, useState, useEffect } from 'react';

export const SwitchContext = createContext();

export const SwitchProvider = ({ children }) => {
  const [switchStates, setSwitchStates] = useState(() => {
    const savedSwitchStates = JSON.parse(localStorage.getItem('switchStates'));
    return savedSwitchStates || {
      first: false,
      second: false,
      third: false,
      fourth: false,
      promotion: false, // Add Promotion switch state
    };
  });

  useEffect(() => {
    localStorage.setItem('switchStates', JSON.stringify(switchStates));
  }, [switchStates]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const savedSwitchStates = JSON.parse(localStorage.getItem('switchStates'));
      if (savedSwitchStates) {
        setSwitchStates(savedSwitchStates);
      }
    }, 1000); // Refresh every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  return (
    <SwitchContext.Provider value={{ switchStates, setSwitchStates }}>
      {children}
    </SwitchContext.Provider>
  );
};
