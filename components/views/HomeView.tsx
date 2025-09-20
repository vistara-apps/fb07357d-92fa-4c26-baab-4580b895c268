'use client';

import { useState } from 'react';
import { Play, Users, Trophy, TrendingUp, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TutorialCard } from '@/components/features/TutorialCard';
import { ChallengeCard } from '@/components/features/ChallengeCard';
import { MOCK_TUTORIALS, MOCK_CHALLENGES, DANCE_STYLES } from '@/lib/constants';
import { DanceTutorial, Challenge } from '@/lib/types';

export function HomeView() {
  const [selectedTutorial, setSelectedTutorial] = useState<DanceTutorial | null>(null);

  const featuredTutorials = MOCK_TUTORIALS.slice(0, 3);
  const activeChallenges = MOCK_CHALLENGES.filter(c => 
    new Date() >= c.startDate && new Date() <= c.endDate
  ).slice(0, 2);

  const handlePlayTutorial = (tutorial: DanceTutorial) => {
    setSelectedTutorial(tutorial);
    // In a real app, this would open a video player modal
    console.log('Playing tutorial:', tutorial.title);
  };

  const handlePracticeTutorial = (tutorial: DanceTutorial) => {
    console.log('Starting practice for:', tutorial.title);
  };

  const handleJoinChallenge = (challenge: Challenge) => {
    console.log('Joining challenge:', challenge.title);
  };

  const handleViewChallenge = (challenge: Challenge) => {
    console.log('Viewing challenge:', challenge.title);
  };

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Hero Section */}
      <section className="text-center">
        <div className="relative mb-6">
          <div className="w-32 h-32 bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center mx-auto dance-glow animate-pulse-glow">
            <span className="text-6xl">💃</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-text-primary mb-2">
          Welcome to GrooveSync
        </h1>
        <p className="text-text-secondary text-lg mb-6">
          Your journey to dance mastery starts here
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="primary" size="lg" className="gradient-bg">
            <Play className="w-5 h-5 mr-2" />
            Start Learning
          </Button>
          <Button variant="secondary" size="lg">
            <Users className="w-5 h-5 mr-2" />
            Find Partners
          </Button>
        </div>
      </section>

      {/* Quick Stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">50+</div>
            <div className="text-sm text-text-secondary">Tutorials</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">1.2k</div>
            <div className="text-sm text-text-secondary">Dancers</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">24</div>
            <div className="text-sm text-text-secondary">Live Sessions</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">8</div>
            <div className="text-sm text-text-secondary">Challenges</div>
          </Card>
        </div>
      </section>

      {/* Dance Styles */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary">Explore Styles</h2>
          <Button variant="secondary" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {DANCE_STYLES.slice(0, 8).map((style) => (
            <Card
              key={style.name}
              className="p-4 text-center hover:scale-105 transition-transform duration-200 cursor-pointer"
              hover
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${style.color} rounded-full flex items-center justify-center mx-auto mb-2`}>
                <span className="text-2xl">{style.emoji}</span>
              </div>
              <div className="text-sm font-medium text-text-primary">{style.name}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Tutorials */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Star className="w-5 h-5 text-accent" />
            Featured Tutorials
          </h2>
          <Button variant="secondary" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.tutorialId}
              tutorial={tutorial}
              onPlay={handlePlayTutorial}
              onPractice={handlePracticeTutorial}
            />
          ))}
        </div>
      </section>

      {/* Active Challenges */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <Trophy className="w-5 h-5 text-accent" />
            Active Challenges
          </h2>
          <Button variant="secondary" size="sm">
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.challengeId}
              challenge={challenge}
              onJoin={handleJoinChallenge}
              onView={handleViewChallenge}
            />
          ))}
        </div>
      </section>

      {/* Trending Section */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            Trending Now
          </h2>
        </div>
        <Card className="p-6">
          <div className="text-center">
            <div className="text-4xl mb-3">🔥</div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              K-Pop Wave Challenge
            </h3>
            <p className="text-text-secondary mb-4">
              Join 500+ dancers in the hottest challenge this week
            </p>
            <Button variant="accent" size="lg">
              Join the Wave
            </Button>
          </div>
        </Card>
      </section>
    </div>
  );
}
