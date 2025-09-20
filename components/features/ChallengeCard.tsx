import { Trophy, Calendar, Users, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Challenge } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface ChallengeCardProps {
  challenge: Challenge;
  onJoin?: (challenge: Challenge) => void;
  onView?: (challenge: Challenge) => void;
  onSubmit?: (challenge: Challenge) => void;
  currentUserId?: string;
  hasSubmitted?: boolean;
  className?: string;
}

export function ChallengeCard({
  challenge,
  onJoin,
  onView,
  onSubmit,
  currentUserId,
  hasSubmitted = false,
  className
}: ChallengeCardProps) {
  const isActive = new Date() >= new Date(challenge.startDate) &&
                   new Date() <= new Date(challenge.endDate);
  const isUpcoming = new Date() < new Date(challenge.startDate);
  const isEnded = new Date() > new Date(challenge.endDate);

  const getStatusBadge = () => {
    if (isActive) return <Badge variant="success">Active</Badge>;
    if (isUpcoming) return <Badge variant="primary">Upcoming</Badge>;
    return <Badge variant="secondary">Ended</Badge>;
  };

  const getDifficultyColor = () => {
    switch (challenge.difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-text-secondary';
    }
  };

  return (
    <Card
      className={cn(
        'p-4 hover:shadow-lg transition-shadow duration-200',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary mb-1">
              {challenge.title}
            </h3>
            <div className="flex items-center gap-2">
              {getStatusBadge()}
              <span className={cn('text-sm font-medium', getDifficultyColor())}>
                {challenge.difficulty}
              </span>
            </div>
          </div>
        </div>

        {challenge.prize && (
          <Badge variant="accent" size="sm">
            {challenge.prize}
          </Badge>
        )}
      </div>

      <p className="text-text-secondary text-sm mb-4 line-clamp-2">
        {challenge.description}
      </p>

      {/* Creator info */}
      {challenge.creator && (
        <div className="flex items-center gap-2 mb-3">
          <Avatar
            src={challenge.creator.profilePicUrl}
            alt={challenge.creator.username}
            fallback={challenge.creator.username?.[0] || 'C'}
            size="sm"
          />
          <span className="text-sm text-text-secondary">
            by {challenge.creator.username}
          </span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {challenge.participantCount} participants
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-text-secondary" />
          <span className="text-sm text-text-secondary">
            {isActive ? 'Ends' : isUpcoming ? 'Starts' : 'Ended'} {formatDate(challenge.endDate)}
          </span>
        </div>
      </div>

      {/* Tags */}
      {challenge.tags && challenge.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {challenge.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="secondary" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={() => onView?.(challenge)}
          variant="secondary"
          size="sm"
          className="flex-1"
        >
          View Details
        </Button>

        {isActive && !hasSubmitted && (
          <Button
            onClick={() => onSubmit?.(challenge)}
            variant="primary"
            size="sm"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Submit
          </Button>
        )}

        {hasSubmitted && (
          <Badge variant="success" size="sm">
            Submitted
          </Badge>
        )}
      </div>
    </Card>
  );
}

