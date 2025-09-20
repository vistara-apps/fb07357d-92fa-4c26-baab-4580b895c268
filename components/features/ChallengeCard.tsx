'use client';

import { Calendar, Trophy, Users, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Challenge } from '@/lib/types';
import { formatTimeAgo, getDifficultyColor } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin: (challenge: Challenge) => void;
  onView: (challenge: Challenge) => void;
}

export function ChallengeCard({ challenge, onJoin, onView }: ChallengeCardProps) {
  const isActive = new Date() >= challenge.startDate && new Date() <= challenge.endDate;
  const isUpcoming = new Date() < challenge.startDate;
  const isEnded = new Date() > challenge.endDate;

  const getStatusColor = () => {
    if (isActive) return 'text-green-400 bg-green-400/10';
    if (isUpcoming) return 'text-blue-400 bg-blue-400/10';
    return 'text-gray-400 bg-gray-400/10';
  };

  const getStatusText = () => {
    if (isActive) return 'Active';
    if (isUpcoming) return 'Upcoming';
    return 'Ended';
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-accent" />
              <span className={cn('text-xs font-medium px-2 py-1 rounded-full', getStatusColor())}>
                {getStatusText()}
              </span>
            </div>
            <h3 className="font-semibold text-text-primary line-clamp-2">
              {challenge.title}
            </h3>
          </div>
          <div className={cn('text-xs font-medium px-2 py-1 rounded-full bg-surface', getDifficultyColor(challenge.difficulty))}>
            {challenge.difficulty}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">
          {challenge.description}
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {challenge.participantCount} joined
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-text-secondary" />
            <span className="text-sm text-text-secondary">
              {formatTimeAgo(challenge.endDate)}
            </span>
          </div>
        </div>
        
        {/* Prize */}
        {challenge.prize && (
          <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-text-primary">Prize Pool</span>
            </div>
            <div className="text-lg font-bold text-accent mt-1">
              {challenge.prize}
            </div>
          </div>
        )}
        
        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {challenge.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs bg-surface/50 text-text-secondary px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onView(challenge)}
            className="flex-1"
          >
            View Details
          </Button>
          {isActive && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onJoin(challenge)}
              className="flex-1"
            >
              Join Challenge
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
