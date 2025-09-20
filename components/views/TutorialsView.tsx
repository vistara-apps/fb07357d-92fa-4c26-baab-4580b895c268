'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Play } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TextField } from '@/components/ui/TextField';
import { Select } from '@/components/ui/Dropdown';
import { TutorialCard } from '@/components/features/TutorialCard';
import { DanceTutorial } from '@/lib/types';
import { tutorialApi } from '@/lib/services/api';
import { DANCE_STYLES } from '@/lib/constants';

interface TutorialsViewProps {
  onPlayTutorial?: (tutorial: DanceTutorial) => void;
  onPracticeTutorial?: (tutorial: DanceTutorial) => void;
}

export function TutorialsView({ onPlayTutorial, onPracticeTutorial }: TutorialsViewProps) {
  const [tutorials, setTutorials] = useState<DanceTutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchTutorials();
  }, []);

  const fetchTutorials = async () => {
    try {
      const tutorialsData = await tutorialApi.getAll();
      setTutorials(tutorialsData);
    } catch (error) {
      console.error('Error fetching tutorials:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = !searchQuery ||
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStyle = selectedStyle === 'all' ||
      tutorial.danceStyle.toLowerCase() === selectedStyle.toLowerCase();

    const matchesDifficulty = selectedDifficulty === 'all' ||
      tutorial.difficulty === selectedDifficulty;

    return matchesSearch && matchesStyle && matchesDifficulty;
  });

  const handlePlayTutorial = (tutorial: DanceTutorial) => {
    onPlayTutorial?.(tutorial);
  };

  const handlePracticeTutorial = (tutorial: DanceTutorial) => {
    onPracticeTutorial?.(tutorial);
  };

  if (loading) {
    return (
      <div className="px-4 py-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading tutorials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Dance Tutorials
        </h1>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Learn new moves with our curated collection of dance tutorials.
          From beginner basics to advanced techniques, find the perfect tutorial for your skill level.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="p-4">
        <div className="flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="flex gap-4">
            <div className="flex-1">
              <TextField
                placeholder="Search tutorials, instructors, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startIcon={<Search className="w-4 h-4" />}
                fullWidth
              />
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="secondary"
              className="shrink-0"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <Select
                options={[
                  { value: 'all', label: 'All Dance Styles' },
                  ...DANCE_STYLES.map(style => ({
                    value: style.name.toLowerCase(),
                    label: style.name
                  }))
                ]}
                value={selectedStyle}
                onChange={setSelectedStyle}
                placeholder="Select dance style"
              />

              <Select
                options={[
                  { value: 'all', label: 'All Difficulties' },
                  { value: 'beginner', label: 'Beginner' },
                  { value: 'intermediate', label: 'Intermediate' },
                  { value: 'advanced', label: 'Advanced' },
                ]}
                value={selectedDifficulty}
                onChange={setSelectedDifficulty}
                placeholder="Select difficulty"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Quick Style Access */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Popular Dance Styles
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {DANCE_STYLES.slice(0, 6).map((style) => (
            <Card
              key={style.name}
              className="p-4 text-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => setSelectedStyle(style.name.toLowerCase())}
            >
              <div
                className="w-12 h-12 rounded-full mx-auto mb-2"
                style={{ background: style.color }}
              />
              <h3 className="font-medium text-text-primary text-sm">
                {style.name}
              </h3>
            </Card>
          ))}
        </div>
      </div>

      {/* Tutorials Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">
            {filteredTutorials.length === tutorials.length
              ? `All Tutorials (${tutorials.length})`
              : `Filtered Results (${filteredTutorials.length})`
            }
          </h2>

          {(searchQuery || selectedStyle !== 'all' || selectedDifficulty !== 'all') && (
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedStyle('all');
                setSelectedDifficulty('all');
              }}
              variant="secondary"
              size="sm"
            >
              Clear Filters
            </Button>
          )}
        </div>

        {filteredTutorials.length === 0 ? (
          <Card className="p-8 text-center">
            <Search className="w-12 h-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              No tutorials found
            </h3>
            <p className="text-text-secondary mb-4">
              {searchQuery || selectedStyle !== 'all' || selectedDifficulty !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'No tutorials are available at the moment.'
              }
            </p>
            {(searchQuery || selectedStyle !== 'all' || selectedDifficulty !== 'all') && (
              <Button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStyle('all');
                  setSelectedDifficulty('all');
                }}
                variant="primary"
              >
                Clear Filters
              </Button>
            )}
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTutorials.map((tutorial) => (
              <TutorialCard
                key={tutorial.tutorialId}
                tutorial={tutorial}
                onPlay={() => handlePlayTutorial(tutorial)}
                onPractice={() => handlePracticeTutorial?.(tutorial)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Featured Tutorial */}
      {tutorials.length > 0 && !searchQuery && selectedStyle === 'all' && selectedDifficulty === 'all' && (
        <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center">
                <Play className="w-8 h-8 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Featured Tutorial
              </h3>
              <p className="text-text-secondary mb-4">
                Check out our most popular tutorial: "{tutorials[0]?.title}"
              </p>
              <Button
                onClick={() => handlePlayTutorial(tutorials[0])}
                variant="primary"
              >
                <Play className="w-4 h-4 mr-2" />
                Start Watching
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

