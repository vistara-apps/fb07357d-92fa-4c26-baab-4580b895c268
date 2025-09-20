'use client';

import { Avatar } from './Avatar';
import { cn } from '@/lib/utils';

interface AvatarGroupProps {
  users: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarGroup({
  users,
  max = 3,
  size = 'md',
  className = '',
}: AvatarGroupProps) {
  const displayUsers = users.slice(0, max);
  const remainingCount = users.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {displayUsers.map((user, index) => (
        <Avatar
          key={user.id}
          src={user.avatar}
          alt={user.name}
          size={size}
          className="border-2 border-background"
          style={{ zIndex: displayUsers.length - index }}
        />
      ))}
      
      {remainingCount > 0 && (
        <div
          className={cn(
            'flex items-center justify-center rounded-full bg-surface border-2 border-background text-text-secondary font-medium',
            size === 'sm' && 'w-8 h-8 text-xs',
            size === 'md' && 'w-12 h-12 text-sm',
            size === 'lg' && 'w-16 h-16 text-base'
          )}
        >
          +{remainingCount}
        </div>
      )}
    </div>
  );
}
