'use client';

import { useState, useEffect } from 'react';
import { Play, Users, Trophy, TrendingUp, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TutorialCard } from '@/components/features/TutorialCard';
import { ChallengeCard } from '@/components/features/ChallengeCard';
import { DanceTutorial, Challenge } from '@/lib/types';
import { tutorialApi, challengeApi } from '@/lib/services/api';
import { Loading } from '@/components/ui/Loading';

interface HomeViewProps {
  onPlayTutorial?: (tutorial: DanceTutorial) => void;
  onPracticeTutorial?: (tutorial: DanceTutorial) => void;
  onViewChallenge?: (challenge: Challenge) => void;
}

export function HomeView({
  onPlayTutorial,
  onPracticeTutorial,
  onViewChallenge
}: HomeViewProps) {
  const [featuredTutorials, setFeaturedTutorials] = useState<DanceTutorial[]>([]);
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      const [tutorialsData, challengesData] = await Promise.all([
        tutorialApi.getAll(),
        challengeApi.getAll(),
      ]);

      // Get featured tutorials (first 3)
      setFeaturedTutorials(tutorialsData.slice(0, 3));

      // Get active challenges (ongoing challenges)
      const now = new Date();
      const activeChallengesData = challengesData.filter(challenge => {
        const startDate = new Date(challenge.startDate);
        const endDate = new Date(challenge.endDate);
        return now >= startDate && now <= endDate;
      }).slice(0, 2);

      setActiveChallenges(activeChallengesData);
    } catch (error) {
      console.error('Error fetching home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePlayTutorial = (tutorial: DanceTutorial) => {
    onPlayTutorial?.(tutorial);
  };

  const handlePracticeTutorial = (tutorial: DanceTutorial) => {
    onPracticeTutorial?.(tutorial);
  };

  const handleViewChallenge = (challenge: Challenge) => {
    onViewChallenge?.(challenge);
  };

  if (loading) {
    return (
      <div className="px-4 py-6">
        <Loading text="Loading your dance journey..." />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">💃</span>
        </div>
        <h1 className="text-4xl font-bold text-text-primary mb-4">
          Welcome to GrooveSync
        </h1>
        <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-8">
          Sync your moves, share your dance. Learn new techniques, practice with AI feedback,
          and connect with dancers worldwide.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" size="lg">
            <Play className="w-5 h-5 mr-2" />
            Start Learning
          </Button>
          <Button variant="secondary" size="lg">
            <Users className="w-5 h-5 mr-2" />
            Find Partners
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Play className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-text-primary">
            {featuredTutorials.length}
          </div>
          <div className="text-sm text-text-secondary">Tutorials</div>
        </Card>

        <Card className="p-4 text-center">
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-text-primary">
            1,234
          </div>
          <div className="text-sm text-text-secondary">Active Dancers</div>
        </Card>

        <Card className="p-4 text-center">
          <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-text-primary">
            {activeChallenges.length}
          </div>
          <div className="text-sm text-text-secondary">Active Challenges</div>
        </Card>

        <Card className="p-4 text-center">
          <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-text-primary">
            98%
          </div>
          <div className="text-sm text-text-secondary">Satisfaction</div>
        </Card>
      </div>

      {/* Featured Tutorials */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-text-primary">
            Featured Tutorials
          </h2>
          <Button variant="secondary">
            View All
          </Button>
        </div>

        {featuredTutorials.length === 0 ? (
          <Card className="p-8 text-center">
            <Play className="w-12 h-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              No tutorials available
            </h3>
            <p className="text-text-secondary">
              Check back soon for new dance tutorials!
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredTutorials.map((tutorial) => (
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

      {/* Active Challenges */}
      {activeChallenges.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-text-primary">
              Active Challenges
            </h2>
            <Button variant="secondary">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.challengeId}
                challenge={challenge}
                onView={() => handleViewChallenge?.(challenge)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Trending Section */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Trending This Week
            </h3>
            <p className="text-text-secondary mb-4">
              "K-Pop Wave Challenge" is taking the community by storm! Join 500+ dancers
              showing off their best moves.
            </p>
            <div className="flex items-center gap-4">
              <Button variant="primary">
                <Trophy className="w-4 h-4 mr-2" />
                Join Challenge
              </Button>
              <div className="flex items-center gap-1 text-sm text-text-secondary">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>4.8 (120 reviews)</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Call to Action */}
      <Card className="p-8 text-center bg-gradient-to-r from-primary/10 to-accent/10">
        <h3 className="text-2xl font-bold text-text-primary mb-4">
          Ready to Start Your Dance Journey?
        </h3>
        <p className="text-text-secondary mb-6 max-w-md mx-auto">
          Join thousands of dancers learning, practicing, and connecting through GrooveSync.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary" size="lg">
            <Play className="w-5 h-5 mr-2" />
            Watch Tutorial
          </Button>
          <Button variant="secondary" size="lg">
            <Users className="w-5 h-5 mr-2" />
            Find Practice Partner
          </Button>
        </div>
      </Card>
    </div>
  );
}

