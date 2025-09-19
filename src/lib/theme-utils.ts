/**
 * Theme utility functions
 */

import { theme } from '@/theme';

type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type ColorKey = keyof Omit<typeof theme.colors, 'primary' | 'accent' | 'success' | 'warning' | 'error'>;

/**
 * Get a color value from the theme
 * @param color - The color key (e.g., 'primary', 'accent', 'success')
 * @param shade - The shade of the color (50-900)
 * @returns The color value
 */
export function getColor(color: 'primary' | 'accent', shade: ColorShade): string;
export function getColor(color: 'success' | 'warning' | 'error', shade: 50 | 500 | 700): string;
export function getColor(color: ColorKey, shade?: never): string;
export function getColor(color: string, shade?: number): string {
  if (shade !== undefined) {
    const colorShade = theme.colors[color as keyof typeof theme.colors];
    if (typeof colorShade === 'object' && colorShade !== null) {
      return (colorShade as Record<string, string>)[shade.toString()] || `var(--color-${color}-${shade})`;
    }
    return `var(--color-${color}-${shade})`;
  }
  
  if (typeof theme.colors[color as keyof typeof theme.colors] === 'string') {
    return theme.colors[color as keyof typeof theme.colors] as string;
  }
  return `var(--color-${color})`;
}

/**
 * Get a text color class based on background color
 * @param bgColor - The background color
 * @returns The appropriate text color class
 */
export function getTextColor(bgColor: string): string {
  // This is a simplified version - you might want to implement more sophisticated color contrast logic
  if (bgColor.includes('50') || bgColor.includes('100') || bgColor.includes('200') || bgColor.includes('300')) {
    return 'text-gray-900';
  }
  return 'text-white';
}

/**
 * Generate CSS variables for a color palette
 * @param name - The name of the color (e.g., 'primary', 'accent')
 * @param colorObj - The color object with shades
 * @returns CSS variables as a string
 */
type ColorObject = Record<string, string | Record<string, string>>;

export function generateColorVariables(
  name: string,
  colorObj: ColorObject
): string {
  return Object.entries(colorObj)
    .map(([key, value]) => `--color-${name}-${key}: ${value};`)
    .join('\n');
}

/**
 * Generate CSS variables for the theme
 * @returns CSS variables as a string
 */
export function generateThemeVariables(): string {
  const { colors } = theme;
  
  return `
    /* Base colors */
    --color-white: ${colors.white};
    --color-black: ${colors.black};
    
    /* Primary colors */
    ${generateColorVariables('primary', colors.primary)}
    
    /* Accent colors */
    ${generateColorVariables('accent', colors.accent)}
    
    /* Semantic colors */
    ${generateColorVariables('success', colors.success)}
    ${generateColorVariables('warning', colors.warning)}
    ${generateColorVariables('error', colors.error)}
    
    /* Background colors */
    --color-bg: ${colors.background.light};
    --color-surface: ${colors.surface.light};
    
    /* Text colors */
    --color-text: ${colors.text.primary.light};
    --color-text-secondary: ${colors.text.secondary.light};
    --color-text-disabled: ${colors.text.disabled.light};
    
    /* Border colors */
    --color-border: ${colors.border.light};
    
    /* Dark mode overrides */
    .dark {
      --color-bg: ${colors.background.dark};
      --color-surface: ${colors.surface.dark};
      --color-text: ${colors.text.primary.dark};
      --color-text-secondary: ${colors.text.secondary.dark};
      --color-text-disabled: ${colors.text.disabled.dark};
      --color-border: ${colors.border.dark};
    }
  `;
}

/**
 * Apply theme to the document
 */
export function applyTheme() {
  const style = document.createElement('style');
  style.id = 'theme-variables';
  style.textContent = `:root { ${generateThemeVariables()} }`;
  
  // Remove existing theme style if it exists
  const existingStyle = document.getElementById('theme-variables');
  if (existingStyle) {
    document.head.removeChild(existingStyle);
  }
  
  document.head.appendChild(style);
}

/**
 * Get the current theme mode (light/dark)
 * @returns 'light' or 'dark'
 */
export function getCurrentTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  
  if (document.documentElement.classList.contains('dark')) {
    return 'dark';
  }
  
  return 'light';
}

/**
 * Toggle between light and dark theme
 * @param theme - The theme to set ('light' or 'dark')
 */
export function toggleTheme(theme?: 'light' | 'dark') {
  if (typeof window === 'undefined') return;
  
  const root = document.documentElement;
  const currentTheme = getCurrentTheme();
  const newTheme = theme || (currentTheme === 'light' ? 'dark' : 'light');
  
  if (newTheme === 'dark') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'dark');
  } else {
    root.classList.remove('dark');
    root.setAttribute('data-theme', 'light');
  }
  
  // Store preference in localStorage
  localStorage.setItem('theme', newTheme);
  
  // Dispatch event for other parts of the app to listen to
  window.dispatchEvent(new Event('theme-changed'));
}
