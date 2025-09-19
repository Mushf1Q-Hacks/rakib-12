import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines multiple class names and merges Tailwind classes
 * @param inputs - Class names to combine
 * @returns Merged class names string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type VariantProps<T extends Record<string, Record<string, string>>> = {
  variants: T;
  defaultVariants?: { [K in keyof T]?: keyof T[K] };
};

/**
 * Creates a function to generate class names with variants
 * @param config - Configuration object with variants and default variants
 * @returns A function that generates class names based on variants
 */
export function createVariants<T extends Record<string, Record<string, string>>>({
  variants,
  defaultVariants = {},
}: VariantProps<T>) {
  return function resolveVariants(
    props: {
      [K in keyof T]?: keyof T[K];
    } & { className?: string } = {}
  ) {
    const { className, ...variantProps } = props;
    const mergedVariants = { ...defaultVariants, ...variantProps } as {
      [K in keyof T]: keyof T[K];
    };

    const variantClasses = Object.entries(mergedVariants).map(([key, value]) => {
      const variantKey = key as keyof T;
      const variantValue = value as keyof T[typeof variantKey];
      return variants[variantKey]?.[variantValue] ?? '';
    });

    return cn(...variantClasses, className);
  };
}

/**
 * Creates a variant function for a specific component
 * @param base - Base class name
 * @param variants - Variant configurations
 * @returns A function that generates class names with variants
 */
export function createComponentVariants<T extends Record<string, Record<string, string>>>(
  base: string,
  variants: T,
  defaultVariants?: { [K in keyof T]?: keyof T[K] }
) {
  const variantFn = createVariants({ variants, defaultVariants });
  
  return (props: Parameters<typeof variantFn>[0] = {}) => {
    return cn(base, variantFn(props));
  };
}

// Example usage:
/*
const buttonVariants = createComponentVariants(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      ghost: 'hover:bg-accent hover:text-accent-foreground',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-10 px-4 py-2',
      sm: 'h-9 rounded-md px-3',
      lg: 'h-11 rounded-md px-8',
      icon: 'h-10 w-10',
    },
  },
  {
    variant: 'default',
    size: 'default',
  }
);

// Usage in component:
<button className={buttonVariants({ variant: 'outline', size: 'sm' })}>
  Click me
</button>
*/
