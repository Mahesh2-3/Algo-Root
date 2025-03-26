"use client"
import { createContext, useState,useEffect } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});

    useEffect(() => {
        let details = localStorage.getItem("User")
        if (details) {
            details = JSON.parse(details)
            setUser(details)
        }
    }   
    , [])

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};
