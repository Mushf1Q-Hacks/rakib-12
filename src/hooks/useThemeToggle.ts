import { useTheme as useNextTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useThemeToggle = () => {
  const { theme, setTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // After mounting, we have access to the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return {
    theme,
    isDark: theme === 'dark',
    toggleTheme,
    mounted,
  };
};
