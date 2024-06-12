import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(() => {
    const user = sessionStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
  });

  useEffect(() => {
    sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const user = sessionStorage.getItem('loggedInUser');
      if (user) {
        setLoggedInUser(JSON.parse(user));
      } else {
        setLoggedInUser(null);
      }
    }, 1000); // Refresh every second

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  const logout = () => {
    // Clear the logged-in user from session storage and state
    sessionStorage.removeItem('loggedInUser');
    setLoggedInUser(null);
  };

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
