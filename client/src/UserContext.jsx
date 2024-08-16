import React, { createContext, useState, useEffect } from 'react';
import { server_URL } from './var'
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(server_URL, {
          method: 'GET',
          credentials: 'include',
        });
        const result = await response.json();
        console.log(result);
        if (result.isLoggedIn) {
          setUser(result.user);
          setIsLoggedIn(true);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
