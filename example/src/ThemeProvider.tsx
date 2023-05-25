import { createContext, useCallback, useState } from 'react';
import * as React from 'react';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

export const ThemeContext = createContext<{
  theme: typeof DefaultTheme;
  toggleTheme: () => void;
}>({
  theme: DefaultTheme,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
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
