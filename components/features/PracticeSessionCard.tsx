'use client';

import { Users, Clock, Play, Video } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { AvatarGroup } from '@/components/ui/AvatarGroup';
import { PracticeSession } from '@/lib/types';
import { formatTimeAgo } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface PracticeSessionCardProps {
  session: PracticeSession;
  onJoin: (session: PracticeSession) => void;
  onWatch: (session: PracticeSession) => void;
}

export function PracticeSessionCard({ session, onJoin, onWatch }: PracticeSessionCardProps) {
  const isLive = session.isLive;
  const isSolo = session.sessionType === 'solo';
  
  // Mock participants data
  const participants = [
    { id: session.userId1, name: 'User 1', avatar: undefined },
    ...(session.userId2 ? [{ id: session.userId2, name: 'User 2', avatar: undefined }] : []),
  ];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {isLive && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-red-400">LIVE</span>
              </div>
            )}
            <span className="text-xs text-text-secondary capitalize">
              {session.sessionType} Practice
            </span>
          </div>
          <div className="flex items-center gap-1 text-text-secondary">
            <Clock className="w-3 h-3" />
            <span className="text-xs">
              {formatTimeAgo(session.startTime)}
            </span>
          </div>
        </div>
        
        {/* Participants */}
        <div className="flex items-center gap-3 mb-4">
          <AvatarGroup users={participants} max={3} size="sm" />
          <div className="flex-1">
            <div className="text-sm font-medium text-text-primary">
              {isSolo ? 'Solo Practice' : `${participants.length} Dancers`}
            </div>
            <div className="text-xs text-text-secondary">
              {isLive ? 'Currently practicing' : 'Practice session'}
            </div>
          </div>
        </div>
        
        {/* Session Info */}
        <div className="bg-surface/30 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Play className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-text-primary">
              Hip-Hop Basics Session
            </span>
          </div>
          <div className="text-xs text-text-secondary">
            Working on rhythm and flow fundamentals
          </div>
        </div>
        
        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">
                {participants.length}/{session.sessionType === 'group' ? '8' : '2'}
              </span>
            </div>
            {session.recordingUrl && (
              <div className="flex items-center gap-1">
                <Video className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-secondary">Recorded</span>
              </div>
            )}
          </div>
          
          {isLive && (
            <div className="text-xs text-green-400 font-medium">
              • Available to join
            </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          {isLive ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => onJoin(session)}
              className="flex-1"
            >
              <Users className="w-4 h-4 mr-2" />
              Join Practice
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onWatch(session)}
              className="flex-1"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch Recording
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
