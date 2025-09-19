import { Global, css } from '@emotion/react';
import { theme as baseTheme } from './index';

// Extend the default emotion theme type with our theme
declare module '@emotion/react' {
  export interface Theme {
    colors: typeof baseTheme.colors;
    shadows: typeof baseTheme.shadows;
    typography: typeof baseTheme.typography;
    radii: typeof baseTheme.radii;
    transitions: typeof baseTheme.transitions;
    space: typeof baseTheme.space;
    sizes: typeof baseTheme.sizes;
    breakpoints: typeof baseTheme.breakpoints;
    zIndices: typeof baseTheme.zIndices;
  }
}

const GlobalStyles = () => (
  <Global
    styles={css`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
      
      :root {
        /* Typography */
        --font-sans: ${baseTheme.typography.fontFamily};
        
        /* Light theme colors */
        --color-primary: ${baseTheme.colors.primary[600]};
        --color-primary-light: ${baseTheme.colors.primary[400]};
        --color-primary-dark: ${baseTheme.colors.primary[800]};
        --color-accent: ${baseTheme.colors.accent[500]};
        --color-bg: ${baseTheme.colors.background.light};
        --color-surface: ${baseTheme.colors.surface.light};
        --color-text: ${baseTheme.colors.text.primary.light};
        --color-text-secondary: ${baseTheme.colors.text.secondary.light};
        --color-text-disabled: ${baseTheme.colors.text.disabled.light};
        --color-border: ${baseTheme.colors.border.light};
        --color-success: ${baseTheme.colors.success[500]};
        --color-warning: ${baseTheme.colors.warning[500]};
        --color-error: ${baseTheme.colors.error[500]};
        
        /* Shadows */
        --shadow-sm: ${baseTheme.shadows.sm};
        --shadow-md: ${baseTheme.shadows.md};
        --shadow-lg: ${baseTheme.shadows.lg};
        
        /* Border radius */
        --radius-sm: ${baseTheme.radii.sm};
        --radius-md: ${baseTheme.radii.md};
        --radius-lg: ${baseTheme.radii.lg};
        --radius-full: ${baseTheme.radii.full};
        
        /* Transitions */
        --transition: ${baseTheme.transitions.default};
        --transition-fast: ${baseTheme.transitions.fast};
        --transition-slow: ${baseTheme.transitions.slow};
      }
      
      /* Dark theme overrides */
      [data-theme='dark'] {
        --color-bg: ${baseTheme.colors.background.dark};
        --color-surface: ${baseTheme.colors.surface.dark};
        --color-text: ${baseTheme.colors.text.primary.dark};
        --color-text-secondary: ${baseTheme.colors.text.secondary.dark};
        --color-text-disabled: ${baseTheme.colors.text.disabled.dark};
        --color-border: ${baseTheme.colors.border.dark};
      }
      
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      html {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-rendering: optimizeLegibility;
        scroll-behavior: smooth;
      }
      
      body {
        font-family: var(--font-sans);
        color: var(--color-text);
        background-color: var(--color-bg);
        line-height: ${baseTheme.typography.lineHeights.normal};
        font-weight: ${baseTheme.typography.fontWeights.normal};
        transition: background-color 0.2s ease, color 0.2s ease;
      }
      
      a {
        color: var(--color-primary);
        text-decoration: none;
        transition: var(--transition);
        
        &:hover {
          color: var(--color-primary-dark);
        }
      }
      
      button, 
      input, 
      select, 
      textarea {
        font-family: inherit;
        font-size: 100%;
        line-height: inherit;
        color: inherit;
        margin: 0;
        padding: 0;
      }
      
      button, 
      [role="button"] {
        cursor: pointer;
        background-color: transparent;
        border: none;
      }
      
      img, 
      svg, 
      video, 
      canvas, 
      audio, 
      iframe, 
      embed, 
      object {
        display: block;
        vertical-align: middle;
      }
      
      img, 
      video {
        max-width: 100%;
        height: auto;
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-weight: ${baseTheme.typography.fontWeights.bold};
        line-height: ${baseTheme.typography.lineHeights.tight};
        margin-bottom: 1rem;
        color: var(--color-text);
      }
      
      h1 { font-size: 2.5rem; }
      h2 { font-size: 2rem; }
      h3 { font-size: 1.75rem; }
      h4 { font-size: 1.5rem; }
      h5 { font-size: 1.25rem; }
      h6 { font-size: 1rem; }
      
      p {
        margin-bottom: 1rem;
        line-height: ${baseTheme.typography.lineHeights.relaxed};
        color: var(--color-text-secondary);
      }
      
      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
      }
      
      ::-webkit-scrollbar-track {
        background: var(--color-bg);
      }
      
      ::-webkit-scrollbar-thumb {
        background: var(--color-border);
        border-radius: 4px;
        transition: background-color 0.2s ease;
        
        &:hover {
          background: var(--color-text-secondary);
        }
      }
    `}
  />
);

export default GlobalStyles;
