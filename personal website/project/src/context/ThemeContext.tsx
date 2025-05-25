import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkGreen: boolean;
  toggleBackground: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkGreen, setIsDarkGreen] = useState(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('isDarkGreen');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Save preference to localStorage
    localStorage.setItem('isDarkGreen', JSON.stringify(isDarkGreen));
    // Update body class
    document.body.classList.toggle('dark-green-bg', isDarkGreen);
  }, [isDarkGreen]);

  const toggleBackground = () => {
    setIsDarkGreen(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkGreen, toggleBackground }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 