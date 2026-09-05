import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({
  isDark: false,
  toggleTheme: () => {},
  theme: { background: '#f9f9f9', text: '#1a1a1a', card: '#fff', border: '#eee', header: '#fff' }
});

export const ThemeProvider = ({ children }: any) => {
  const [isDark, setIsDark] = useState(false);

  const theme = {
    background: isDark ? '#121212' : '#f9f9f9',
    text: isDark ? '#ffffff' : '#1a1a1a',
    card: isDark ? '#1e1e1e' : '#fff',
    border: isDark ? '#333' : '#eee',
    header: isDark ? '#1e1e1e' : '#fff', 
  };

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);