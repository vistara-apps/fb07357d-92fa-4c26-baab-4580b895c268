import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'beginner':
    case 'easy':
      return 'text-green-400';
    case 'intermediate':
    case 'medium':
      return 'text-yellow-400';
    case 'advanced':
    case 'hard':
      return 'text-red-400';
    default:
      return 'text-text-secondary';
  }
}

export function getDanceStyleEmoji(style: string): string {
  const emojiMap: Record<string, string> = {
    'hip-hop': '🎤',
    'ballet': '🩰',
    'jazz': '🎷',
    'contemporary': '🌊',
    'breakdance': '🔥',
    'salsa': '💃',
    'tango': '🌹',
    'freestyle': '⚡',
    'kpop': '🌟',
    'latin': '🎺',
  };
  
  return emojiMap[style.toLowerCase()] || '💃';
}
