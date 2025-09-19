'use client';

import { useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { applyTheme } from '@/lib/theme-utils';

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Apply theme variables when the provider mounts
  useEffect(() => {
    applyTheme();
  }, []);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
