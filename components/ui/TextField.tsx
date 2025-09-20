import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({
    label,
    error,
    helperText,
    startIcon,
    endIcon,
    fullWidth = true,
    className,
    ...props
  }, ref) => {
    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}

        <div className="relative">
          {startIcon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
              {startIcon}
            </div>
          )}

          <input
            ref={ref}
            className={cn(
              'px-4 py-3 bg-surface border border-white/10 rounded-md',
              'text-text-primary placeholder-text-secondary',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
              'transition-colors duration-200',
              startIcon && 'pl-10',
              endIcon && 'pr-10',
              error && 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500',
              fullWidth && 'w-full',
              className
            )}
            {...props}
          />

          {endIcon && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-text-secondary">
              {endIcon}
            </div>
          )}
        </div>

        {(error || helperText) && (
          <p className={cn(
            'text-sm mt-1',
            error ? 'text-red-400' : 'text-text-secondary'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextField.displayName = 'TextField';

// TextArea component
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({
    label,
    error,
    helperText,
    fullWidth = true,
    className,
    ...props
  }, ref) => {
    return (
      <div className={cn('flex flex-col', fullWidth && 'w-full')}>
        {label && (
          <label className="text-sm font-medium text-text-primary mb-2">
            {label}
          </label>
        )}

        <textarea
          ref={ref}
          className={cn(
            'px-4 py-3 bg-surface border border-white/10 rounded-md',
            'text-text-primary placeholder-text-secondary',
            'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary',
            'transition-colors duration-200 resize-vertical',
            'min-h-[100px]',
            error && 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500',
            fullWidth && 'w-full',
            className
          )}
          {...props}
        />

        {(error || helperText) && (
          <p className={cn(
            'text-sm mt-1',
            error ? 'text-red-400' : 'text-text-secondary'
          )}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';

