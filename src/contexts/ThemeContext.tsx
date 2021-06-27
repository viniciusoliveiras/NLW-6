import { createContext, ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

type ThemeContextProviderProps = {
  children: ReactNode;
};

type ThemeContextType = {
  theme: Theme;
  checked: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem('theme');

    return (storedTheme ?? 'light') as Theme;
  });
  const [checked, setChecked] = useState(true);

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    document.body.classList.add(currentTheme);
    document.body.classList.remove(currentTheme === 'light' ? 'dark' : 'light');
  }, [currentTheme]);

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
    setChecked(!checked);
  }

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, toggleTheme, checked }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
