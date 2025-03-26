// context/MenuContext.js
"use client";
import { createContext, useState, useContext } from "react";

const MenuContext = createContext();

export const MenuProvider = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = (message) => {
        if (message === "") {
            setIsVisible(prev => !prev);

        } else {
            setIsVisible(message)
        }
    }

    return (
        <MenuContext.Provider value={{ isVisible, toggleVisibility }}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenu = () => useContext(MenuContext);
