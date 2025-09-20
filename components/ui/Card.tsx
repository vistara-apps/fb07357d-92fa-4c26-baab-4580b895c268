'use client';

import { cn } from '@/lib/utils';
import { CardProps } from '@/lib/types';

export function Card({
  children,
  className = '',
  onClick,
  hover = false,
}: CardProps) {
  const baseStyles = 'bg-surface rounded-lg border border-surface/20 shadow-card';
  const interactiveStyles = onClick ? 'cursor-pointer' : '';
  const hoverStyles = hover ? 'hover:bg-surface/80 hover:shadow-lg transition-all duration-200' : '';

  return (
    <div
      className={cn(
        baseStyles,
        interactiveStyles,
        hoverStyles,
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
