import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  className,
  onClick
}: AvatarProps) {
  const sizeClasses = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl',
  };

  const getFallbackText = () => {
    if (fallback) return fallback;
    return alt.charAt(0).toUpperCase();
  };

  return (
    <div
      className={cn(
        'relative rounded-full bg-surface border-2 border-white/10 flex items-center justify-center overflow-hidden',
        sizeClasses[size],
        onClick && 'cursor-pointer hover:border-white/20 transition-colors',
        className
      )}
      onClick={onClick}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to text if image fails to load
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = getFallbackText();
              parent.classList.add('bg-primary', 'text-white', 'font-medium', 'flex', 'items-center', 'justify-center');
            }
          }}
        />
      ) : (
        <span className="text-text-primary font-medium">
          {getFallbackText()}
        </span>
      )}
    </div>
  );
}

// Avatar with status indicator
interface AvatarWithStatusProps extends AvatarProps {
  status?: 'online' | 'offline' | 'away' | 'busy';
}

export function AvatarWithStatus({
  status = 'offline',
  className,
  ...props
}: AvatarWithStatusProps) {
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
    busy: 'bg-red-500',
  };

  return (
    <div className="relative">
      <Avatar {...props} className={className} />
      <div
        className={cn(
          'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-surface',
          statusColors[status]
        )}
      />
    </div>
  );
}

