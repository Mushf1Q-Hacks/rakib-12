import { type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/class-variants';
import { loadingVariants, type LoadingSpinnerVariantProps } from './loading-variants';

export interface LoadingSpinnerProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'>,
    VariantProps<LoadingSpinnerVariantProps> {
  label?: string;
  labelClassName?: string;
}

export function LoadingSpinner({
  className,
  size,
  color,
  label,
  labelClassName,
  ...props
}: LoadingSpinnerProps) {
  return (
    <div className={cn('inline-flex items-center gap-2', className)}>
      <span
        className={loadingVariants({ size, color, className })}
        role="status"
        aria-label={label || 'Loading...'}
        {...props}
      >
        <span className="sr-only">{label || 'Loading...'}</span>
      </span>
      {label && (
        <span className={cn('text-sm', labelClassName)}>{label}</span>
      )}
    </div>
  );
}

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  isLoading?: boolean;
  spinnerProps?: Omit<LoadingSpinnerProps, 'className'>;
  backdropClassName?: string;
  spinnerClassName?: string;
}

export function LoadingOverlay({
  isLoading = true,
  className,
  spinnerProps,
  backdropClassName,
  spinnerClassName,
  children,
  ...props
}: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={cn('relative', className)} {...props}>
      {children && (
        <div className={cn('opacity-50 pointer-events-none', className)}>
          {children}
        </div>
      )}
      <div
        className={cn(
          'absolute inset-0 flex items-center justify-center bg-background/80',
          backdropClassName
        )}
      >
        <LoadingSpinner
          size="lg"
          className={cn('text-primary', spinnerClassName)}
          {...spinnerProps}
        />
      </div>
    </div>
  );
}

export function LoadingPage({
  fullScreen = true,
  className,
  ...props
}: Omit<LoadingOverlayProps, 'children'> & { fullScreen?: boolean }) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        fullScreen && 'h-screen w-screen',
        className
      )}
    >
      <LoadingSpinner 
        size="xl" 
        color={props.spinnerClassName?.includes('text-') ? 'primary' : undefined}
        className={props.spinnerClassName}
      />
    </div>
  );
}
