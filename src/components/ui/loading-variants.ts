import { cva } from 'class-variance-authority';

export const loadingVariants = cva(
  'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        xs: 'h-3 w-3',
        sm: 'h-4 w-4',
        default: 'h-5 w-5',
        lg: 'h-6 w-6',
        xl: 'h-8 w-8',
      },
      color: {
        primary: 'text-primary',
        secondary: 'text-secondary',
        muted: 'text-muted-foreground',
        white: 'text-white',
      },
    },
    defaultVariants: {
      size: 'default',
      color: 'primary',
    },
  }
);

export type LoadingSpinnerVariantProps = typeof loadingVariants;
