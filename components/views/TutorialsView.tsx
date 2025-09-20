'use client';

import { useState } from 'react';
import { Search, Filter, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TutorialCard } from '@/components/features/TutorialCard';
import { MOCK_TUTORIALS, DANCE_STYLES } from '@/lib/constants';
import { DanceTutorial } from '@/lib/types';
import { cn } from '@/lib/utils';

export function TutorialsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTutorials = MOCK_TUTORIALS.filter((tutorial) => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutorial.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStyle = selectedStyle === 'all' || tutorial.danceStyle === selectedStyle.toLowerCase();
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesStyle && matchesDifficulty;
  });

  const handlePlayTutorial = (tutorial: DanceTutorial) => {
    console.log('Playing tutorial:', tutorial.title);
  };

  const handlePracticeTutorial = (tutorial: DanceTutorial) => {
    console.log('Starting practice for:', tutorial.title);
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Dance Tutorials</h1>
        <p className="text-text-secondary">Master new moves with expert instruction</p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Search tutorials, instructors, or styles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-surface border border-surface/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            {filteredTutorials.length} tutorials found
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="p-4 space-y-4">
            {/* Dance Style Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Dance Style
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedStyle('all')}
                  className={cn(
                    'px-3 py-1 text-sm rounded-full transition-colors duration-200',
                    selectedStyle === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-surface text-text-secondary hover:text-text-primary'
                  )}
                >
                  All Styles
                </button>
                {DANCE_STYLES.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setSelectedStyle(style.name)}
                    className={cn(
                      'px-3 py-1 text-sm rounded-full transition-colors duration-200 flex items-center gap-1',
                      selectedStyle === style.name
                        ? 'bg-primary text-white'
                        : 'bg-surface text-text-secondary hover:text-text-primary'
                    )}
                  >
                    <span>{style.emoji}</span>
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Difficulty
              </label>
              <div className="flex gap-2">
                {['all', 'beginner', 'intermediate', 'advanced'].map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={cn(
                      'px-3 py-1 text-sm rounded-full transition-colors duration-200 capitalize',
                      selectedDifficulty === difficulty
                        ? 'bg-primary text-white'
                        : 'bg-surface text-text-secondary hover:text-text-primary'
                    )}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* Quick Access Styles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {DANCE_STYLES.slice(0, 4).map((style) => (
          <Card
            key={style.name}
            className="p-3 text-center cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => setSelectedStyle(style.name)}
            hover
          >
            <div className={`w-10 h-10 bg-gradient-to-br ${style.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
              <span className="text-xl">{style.emoji}</span>
            </div>
            <div className="text-sm font-medium text-text-primary">{style.name}</div>
          </Card>
        ))}
      </div>

      {/* Tutorials Grid */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.tutorialId}
              tutorial={tutorial}
              onPlay={handlePlayTutorial}
              onPractice={handlePracticeTutorial}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <div className="text-4xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No tutorials found
          </h3>
          <p className="text-text-secondary mb-4">
            Try adjusting your search or filters to find what you're looking for.
          </p>
          <Button
            variant="primary"
            onClick={() => {
              setSearchQuery('');
              setSelectedStyle('all');
              setSelectedDifficulty('all');
            }}
          >
            Clear Filters
          </Button>
        </Card>
      )}
    </div>
  );
}
