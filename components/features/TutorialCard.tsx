'use client';

import { Play, Clock, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { DanceTutorial } from '@/lib/types';
import { formatDuration, getDifficultyColor, getDanceStyleEmoji } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface TutorialCardProps {
  tutorial: DanceTutorial;
  onPlay: (tutorial: DanceTutorial) => void;
  onPractice: (tutorial: DanceTutorial) => void;
}

export function TutorialCard({ tutorial, onPlay, onPractice }: TutorialCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-200 group">
      <div className="relative">
        {/* Thumbnail */}
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
          <div className="text-6xl opacity-50 group-hover:scale-110 transition-transform duration-300">
            {getDanceStyleEmoji(tutorial.danceStyle)}
          </div>
          
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <Button
              variant="primary"
              size="lg"
              onClick={() => onPlay(tutorial)}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-2 border-white/30"
            >
              <Play className="w-6 h-6 ml-1" />
            </Button>
          </div>
          
          {/* Duration badge */}
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDuration(tutorial.duration)}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-text-primary line-clamp-2 flex-1">
              {tutorial.title}
            </h3>
            <div className={cn('text-xs font-medium px-2 py-1 rounded-full bg-surface', getDifficultyColor(tutorial.difficulty))}>
              {tutorial.difficulty}
            </div>
          </div>
          
          <p className="text-text-secondary text-sm mb-3 line-clamp-2">
            {tutorial.description}
          </p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs text-text-secondary">by</span>
              <span className="text-xs font-medium text-text-primary">{tutorial.instructor}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="text-xs text-text-secondary">4.8</span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {tutorial.tags.slice(0, 3).map((tag) => (
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
              variant="primary"
              size="sm"
              onClick={() => onPlay(tutorial)}
              className="flex-1"
            >
              <Play className="w-4 h-4 mr-2" />
              Watch
            </Button>
            <Button
              variant="accent"
              size="sm"
              onClick={() => onPractice(tutorial)}
              className="flex-1"
            >
              Practice
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
