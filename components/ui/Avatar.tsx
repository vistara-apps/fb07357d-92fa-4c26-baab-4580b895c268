'use client';

import { cn } from '@/lib/utils';
import { AvatarProps } from '@/lib/types';

export function Avatar({
  src,
  alt,
  size = 'md',
  fallback,
  className = '',
  style,
}: AvatarProps & { style?: React.CSSProperties }) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-base',
    lg: 'w-16 h-16 text-lg',
    xl: 'w-24 h-24 text-xl',
  };

  const getFallback = () => {
    if (fallback) return fallback;
    return alt.charAt(0).toUpperCase();
  };

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center rounded-full bg-gradient-to-br from-primary to-accent text-white font-semibold overflow-hidden',
        sizes[size],
        className
      )}
      style={style}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      ) : (
        <span>{getFallback()}</span>
      )}
    </div>
  );
}
