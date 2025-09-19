/**
 * Animation utility functions and constants
 */

export const ANIMATION_DURATION = {
  fast: '150ms',
  normal: '200ms',
  slow: '300ms',
} as const;

export const ANIMATION_EASING = {
  // Standard easing
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  // Deceleration easing (entering view)
  deceleration: 'cubic-bezier(0, 0, 0.2, 1)',
  // Acceleration easing (exiting view)
  acceleration: 'cubic-bezier(0.4, 0, 1, 1)',
  // Sharp easing (for elements that need to appear/disappear quickly)
  sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
} as const;

export const ANIMATION_DELAY = {
  none: '0ms',
  short: '100ms',
  medium: '200ms',
  long: '300ms',
} as const;

/**
 * Animation variants for Framer Motion
 */
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const slideDown = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export const slideInFromLeft = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export const slideInFromRight = {
  hidden: { x: 20, opacity: 0 },
  visible: { x: 0, opacity: 1 },
};

export const scaleIn = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1 },
};

/**
 * Animation transition presets
 */
export const TRANSITION_DEFAULTS = {
  duration: 0.2,
  ease: ANIMATION_EASING.standard,
} as const;

export const STAGGER_CHILDREN = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
} as const;

/**
 * Animation variants for common UI elements
 */
export const MODAL_VARIANTS = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      ...TRANSITION_DEFAULTS,
      ease: ANIMATION_EASING.deceleration,
    },
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    transition: {
      ...TRANSITION_DEFAULTS,
      ease: ANIMATION_EASING.acceleration,
    },
  },
} as const;

export const TOAST_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      ...TRANSITION_DEFAULTS,
      ease: ANIMATION_EASING.deceleration,
    },
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      ...TRANSITION_DEFAULTS,
      ease: ANIMATION_EASING.acceleration,
    },
  },
} as const;
