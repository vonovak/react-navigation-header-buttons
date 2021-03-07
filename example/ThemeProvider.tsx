import React, { useCallback, useState } from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const ThemeContext = React.createContext<any>({
  theme: DefaultTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DefaultTheme);

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === DefaultTheme ? DarkTheme : DefaultTheme;
    setTheme(nextTheme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
