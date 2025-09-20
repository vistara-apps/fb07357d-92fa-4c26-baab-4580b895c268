'use client';

import { useState } from 'react';
import { Trophy, Calendar, Users, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ChallengeCard } from '@/components/features/ChallengeCard';
import { MOCK_CHALLENGES } from '@/lib/constants';
import { Challenge } from '@/lib/types';
import { cn } from '@/lib/utils';

export function ChallengesView() {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'ended'>('active');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const now = new Date();
  
  const activeChallenges = MOCK_CHALLENGES.filter(c => 
    now >= c.startDate && now <= c.endDate
  );
  
  const upcomingChallenges = MOCK_CHALLENGES.filter(c => 
    now < c.startDate
  );
  
  const endedChallenges = MOCK_CHALLENGES.filter(c => 
    now > c.endDate
  );

  const getCurrentChallenges = () => {
    let challenges = [];
    switch (activeTab) {
      case 'active':
        challenges = activeChallenges;
        break;
      case 'upcoming':
        challenges = upcomingChallenges;
        break;
      case 'ended':
        challenges = endedChallenges;
        break;
    }
    
    if (selectedDifficulty !== 'all') {
      challenges = challenges.filter(c => c.difficulty === selectedDifficulty);
    }
    
    return challenges;
  };

  const handleJoinChallenge = (challenge: Challenge) => {
    console.log('Joining challenge:', challenge.title);
  };

  const handleViewChallenge = (challenge: Challenge) => {
    console.log('Viewing challenge:', challenge.title);
  };

  const handleCreateChallenge = () => {
    console.log('Creating new challenge');
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Dance Challenges</h1>
        <p className="text-text-secondary">Compete, create, and showcase your moves</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-xl font-bold text-primary mb-1">{activeChallenges.length}</div>
          <div className="text-xs text-text-secondary">Active</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-bold text-accent mb-1">{upcomingChallenges.length}</div>
          <div className="text-xs text-text-secondary">Upcoming</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-xl font-bold text-primary mb-1">1.2k</div>
          <div className="text-xs text-text-secondary">Participants</div>
        </Card>
      </div>

      {/* Create Challenge CTA */}
      <Card className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-text-primary mb-1">Create Your Own Challenge</h3>
            <p className="text-sm text-text-secondary">Start a challenge and invite the community to participate</p>
          </div>
          <Button variant="primary" onClick={handleCreateChallenge}>
            <Plus className="w-4 h-4 mr-2" />
            Create
          </Button>
        </div>
      </Card>

      {/* Tabs and Filters */}
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex space-x-1 bg-surface/30 rounded-lg p-1">
          {[
            { id: 'active', label: 'Active', count: activeChallenges.length },
            { id: 'upcoming', label: 'Upcoming', count: upcomingChallenges.length },
            { id: 'ended', label: 'Ended', count: endedChallenges.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-surface'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            {getCurrentChallenges().length} challenges
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
          <Card className="p-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Difficulty
              </label>
              <div className="flex gap-2">
                {['all', 'easy', 'medium', 'hard'].map((difficulty) => (
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

      {/* Challenges Grid */}
      {getCurrentChallenges().length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {getCurrentChallenges().map((challenge) => (
            <ChallengeCard
              key={challenge.challengeId}
              challenge={challenge}
              onJoin={handleJoinChallenge}
              onView={handleViewChallenge}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <div className="text-4xl mb-4">
            {activeTab === 'active' && '🏆'}
            {activeTab === 'upcoming' && '⏰'}
            {activeTab === 'ended' && '🎯'}
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No {activeTab} challenges
          </h3>
          <p className="text-text-secondary mb-4">
            {activeTab === 'active' && "No challenges are currently active. Check back soon!"}
            {activeTab === 'upcoming' && "No upcoming challenges scheduled yet."}
            {activeTab === 'ended' && "No completed challenges to show."}
          </p>
          {activeTab === 'active' && (
            <Button variant="primary" onClick={handleCreateChallenge}>
              <Plus className="w-4 h-4 mr-2" />
              Create First Challenge
            </Button>
          )}
        </Card>
      )}

      {/* Featured Challenge */}
      {activeTab === 'active' && activeChallenges.length > 0 && (
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Trophy className="w-5 h-5 text-accent" />
            <span className="text-sm font-medium text-accent">Featured Challenge</span>
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-2">
            Weekly Freestyle Battle
          </h3>
          <p className="text-text-secondary mb-4">
            Show off your best freestyle moves in this week's featured challenge. Winner takes home 500 USDC!
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-secondary">234 participants</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-secondary">3 days left</span>
              </div>
            </div>
            <Button variant="accent" size="lg">
              Join Battle
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
