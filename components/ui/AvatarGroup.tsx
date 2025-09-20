import { cn } from '@/lib/utils';
import { Avatar } from './Avatar';

interface AvatarGroupProps {
  avatars: Array<{
    src?: string;
    alt: string;
    fallback?: string;
  }>;
  max?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function AvatarGroup({
  avatars,
  max = 5,
  size = 'md',
  className
}: AvatarGroupProps) {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          src={avatar.src}
          alt={avatar.alt}
          fallback={avatar.fallback}
          size={size}
          className="border-2 border-surface"
        />
      ))}

      {remainingCount > 0 && (
        <div
          className={cn(
            'flex items-center justify-center bg-surface border-2 border-surface rounded-full text-text-secondary font-medium',
            {
              'w-8 h-8 text-xs': size === 'sm',
              'w-10 h-10 text-sm': size === 'md',
              'w-12 h-12 text-base': size === 'lg',
              'w-16 h-16 text-lg': size === 'xl',
            }
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}

