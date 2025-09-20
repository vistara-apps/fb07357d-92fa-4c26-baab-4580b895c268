'use client';

import { cn } from '@/lib/utils';
import { ButtonProps } from '@/lib/types';
import { Loader2 } from 'lucide-react';

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  children,
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus:ring-primary/50 shadow-lg hover:shadow-xl',
    secondary: 'bg-surface text-text-primary hover:bg-surface/80 focus:ring-surface/50 border border-surface',
    accent: 'bg-accent text-white hover:bg-accent/90 focus:ring-accent/50 shadow-lg hover:shadow-xl',
    destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500/50',
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-lg',
    lg: 'px-6 py-3 text-lg rounded-xl',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
    </button>
  );
}
