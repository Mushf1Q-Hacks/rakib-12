import { useTheme as useNextTheme } from 'next-themes';
import { toggleTheme as toggleAppTheme } from '@/lib/theme-utils';

export const useTheme = () => {
  const { theme, setTheme, systemTheme, resolvedTheme } = useNextTheme();
  
  const isDark = resolvedTheme === 'dark';
  
  const toggleTheme = (newTheme?: 'light' | 'dark') => {
    if (newTheme) {
      setTheme(newTheme);
      toggleAppTheme(newTheme);
    } else {
      const nextTheme = isDark ? 'light' : 'dark';
      setTheme(nextTheme);
      toggleAppTheme(nextTheme);
    }
  };
  
  return {
    theme,
    systemTheme,
    resolvedTheme,
    isDark,
    setTheme: (theme: 'light' | 'dark' | 'system') => {
      setTheme(theme);
      if (theme !== 'system') {
        toggleAppTheme(theme);
      } else {
        toggleAppTheme(systemTheme as 'light' | 'dark');
      }
    },
    toggleTheme,
  };
};
