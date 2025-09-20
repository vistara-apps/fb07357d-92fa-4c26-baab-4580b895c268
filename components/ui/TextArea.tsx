import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

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

