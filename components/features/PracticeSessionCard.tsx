import { Users, Clock, Play, Pause, User } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { PracticeSession } from '@/lib/types';
import { formatDate, formatRelativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PracticeSessionCardProps {
  session: PracticeSession;
  currentUserId?: string;
  onJoin?: (session: PracticeSession) => void;
  onLeave?: (session: PracticeSession) => void;
  onView?: (session: PracticeSession) => void;
  className?: string;
}

export function PracticeSessionCard({
  session,
  currentUserId,
  onJoin,
  onLeave,
  onView,
  className
}: PracticeSessionCardProps) {
  const isParticipant = currentUserId &&
    (session.userId1 === currentUserId || session.userId2 === currentUserId);
  const isCreator = currentUserId && session.userId1 === currentUserId;
  const canJoin = !isParticipant && session.sessionType !== 'solo' && !session.isLive;

  return (
    <Card
      className={cn(
        'p-4 hover:shadow-lg transition-shadow duration-200',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Avatar
            src={session.user1?.profilePicUrl}
            alt={session.user1?.username || 'User'}
            fallback={session.user1?.username?.[0] || 'U'}
            size="md"
          />
          <div>
            <h3 className="font-semibold text-text-primary">
              {session.user1?.username || 'Anonymous'}
            </h3>
            <p className="text-sm text-text-secondary">
              {session.sessionType === 'solo' ? 'Solo Practice' :
               session.sessionType === 'partner' ? 'Partner Practice' : 'Group Practice'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {session.isLive && (
            <Badge variant="success" size="sm">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse" />
              Live
            </Badge>
          )}

          <Badge variant="primary" size="sm">
            {session.sessionType}
          </Badge>
        </div>
      </div>

      {/* Tutorial info */}
      {session.tutorial && (
        <div className="mb-3 p-3 bg-surface rounded-md">
          <h4 className="font-medium text-text-primary mb-1">
            {session.tutorial.title}
          </h4>
          <p className="text-sm text-text-secondary">
            {session.tutorial.danceStyle} • {session.tutorial.difficulty}
          </p>
        </div>
      )}

      {/* Participants */}
      <div className="flex items-center gap-2 mb-3">
        <Users className="w-4 h-4 text-text-secondary" />
        <span className="text-sm text-text-secondary">
          {session.sessionType === 'solo' ? 'Solo session' :
           session.userId2 ? '2 participants' : '1 participant (waiting for partner)'}
        </span>

        {session.userId2 && (
          <Avatar
            src={session.user2?.profilePicUrl}
            alt={session.user2?.username || 'Partner'}
            fallback={session.user2?.username?.[0] || 'P'}
            size="sm"
          />
        )}
      </div>

      {/* Time info */}
      <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{formatRelativeTime(session.startTime)}</span>
        </div>

        {session.endTime && (
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>Ended {formatRelativeTime(session.endTime)}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {isParticipant ? (
          <>
            <Button
              onClick={() => onView?.(session)}
              variant="primary"
              size="sm"
              className="flex-1"
            >
              {session.isLive ? (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Join Live
                </>
              ) : (
                'View Session'
              )}
            </Button>

            {isCreator && (
              <Button
                onClick={() => onLeave?.(session)}
                variant="destructive"
                size="sm"
              >
                End Session
              </Button>
            )}
          </>
        ) : canJoin ? (
          <Button
            onClick={() => onJoin?.(session)}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            <Users className="w-4 h-4 mr-2" />
            Join Session
          </Button>
        ) : (
          <Button
            onClick={() => onView?.(session)}
            variant="secondary"
            size="sm"
            className="flex-1"
          >
            View Details
          </Button>
        )}
      </div>
    </Card>
  );
}

