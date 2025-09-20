import { Play, Clock, User, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DanceTutorial } from '@/lib/types';
import { formatDuration } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TutorialCardProps {
  tutorial: DanceTutorial;
  onPlay?: (tutorial: DanceTutorial) => void;
  onPractice?: (tutorial: DanceTutorial) => void;
  className?: string;
}

export function TutorialCard({
  tutorial,
  onPlay,
  onPractice,
  className
}: TutorialCardProps) {
  return (
    <Card
      className={cn(
        'overflow-hidden hover:scale-105 transition-transform duration-200 cursor-pointer',
        className
      )}
      onClick={() => onPlay?.(tutorial)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-surface">
        {tutorial.thumbnailUrl ? (
          <img
            src={tutorial.thumbnailUrl}
            alt={tutorial.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <Play className="w-12 h-12 text-primary" />
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute top-2 right-2">
          <Badge variant="default" size="sm">
            <Clock className="w-3 h-3 mr-1" />
            {formatDuration(tutorial.duration)}
          </Badge>
        </div>

        {/* Difficulty badge */}
        <div className="absolute top-2 left-2">
          <Badge
            variant={
              tutorial.difficulty === 'beginner' ? 'success' :
              tutorial.difficulty === 'intermediate' ? 'primary' : 'destructive'
            }
            size="sm"
          >
            {tutorial.difficulty}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-text-primary mb-2 line-clamp-2">
          {tutorial.title}
        </h3>

        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {tutorial.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-3">
          <User className="w-4 h-4 text-text-secondary" />
          <span className="text-sm text-text-secondary">{tutorial.instructor}</span>
        </div>

        {/* Tags */}
        {tutorial.tags && tutorial.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tutorial.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" size="sm">
                {tag}
              </Badge>
            ))}
            {tutorial.tags.length > 3 && (
              <Badge variant="secondary" size="sm">
                +{tutorial.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onPlay?.(tutorial);
            }}
            variant="primary"
            size="sm"
            className="flex-1"
          >
            <Play className="w-4 h-4 mr-2" />
            Watch
          </Button>

          {onPractice && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onPractice(tutorial);
              }}
              variant="secondary"
              size="sm"
            >
              Practice
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

