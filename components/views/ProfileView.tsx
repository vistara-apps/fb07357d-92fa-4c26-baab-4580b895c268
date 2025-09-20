'use client';

import { useState } from 'react';
import { Settings, Trophy, Play, Users, Star, Calendar, Award } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { User } from '@/lib/types';

interface ProfileViewProps {
  user: User | null;
}

export function ProfileView({ user }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'achievements' | 'history'>('overview');

  if (!user) {
    return (
      <div className="px-4 py-6">
        <Card className="p-8 text-center">
          <div className="text-4xl mb-4">👤</div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            Profile Not Available
          </h3>
          <p className="text-text-secondary">
            Please sign in to view your profile.
          </p>
        </Card>
      </div>
    );
  }

  // Mock user stats and data
  const userStats = {
    totalPracticeHours: 24,
    challengesWon: 3,
    tutorialsCompleted: 12,
    practicePartners: 8,
    favoriteStyle: 'Hip-Hop',
    joinDate: new Date('2024-01-01'),
    currentStreak: 7,
  };

  const achievements = [
    { id: '1', title: 'First Steps', description: 'Completed your first tutorial', icon: '🎯', earned: true },
    { id: '2', title: 'Practice Makes Perfect', description: 'Practiced for 10 hours', icon: '⏰', earned: true },
    { id: '3', title: 'Challenge Champion', description: 'Won your first challenge', icon: '🏆', earned: true },
    { id: '4', title: 'Social Dancer', description: 'Practiced with 5 different partners', icon: '👥', earned: true },
    { id: '5', title: 'Style Master', description: 'Master 3 different dance styles', icon: '🎭', earned: false },
    { id: '6', title: 'Streak Legend', description: 'Practice for 30 days straight', icon: '🔥', earned: false },
  ];

  const recentActivity = [
    { id: '1', type: 'tutorial', title: 'Completed "Hip-Hop Basics"', time: '2 hours ago' },
    { id: '2', type: 'challenge', title: 'Joined "Freestyle Friday"', time: '1 day ago' },
    { id: '3', type: 'practice', title: 'Solo practice session', time: '2 days ago' },
    { id: '4', type: 'partner', title: 'Practiced with @dancer_mike', time: '3 days ago' },
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <Avatar
            src={user.profilePicUrl}
            alt={user.username}
            size="xl"
            className="border-4 border-primary/20"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold text-text-primary">{user.username}</h1>
              <Button variant="secondary" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Edit
              </Button>
            </div>
            <p className="text-text-secondary mb-3">
              Dancing since {userStats.joinDate.getFullYear()} • {userStats.favoriteStyle} enthusiast
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-text-secondary">4.8 rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-text-secondary" />
                <span className="text-sm text-text-secondary">{userStats.currentStreak} day streak</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">{userStats.totalPracticeHours}</div>
          <div className="text-sm text-text-secondary">Hours Practiced</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-accent mb-1">{userStats.challengesWon}</div>
          <div className="text-sm text-text-secondary">Challenges Won</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">{userStats.tutorialsCompleted}</div>
          <div className="text-sm text-text-secondary">Tutorials Done</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-accent mb-1">{userStats.practicePartners}</div>
          <div className="text-sm text-text-secondary">Practice Partners</div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-surface/30 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: Star },
          { id: 'achievements', label: 'Achievements', icon: Trophy },
          { id: 'history', label: 'History', icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Current Streak */}
          <Card className="p-6 bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-1">
                  🔥 {userStats.currentStreak} Day Streak
                </h3>
                <p className="text-text-secondary">Keep it up! You're on fire!</p>
              </div>
              <Button variant="accent">
                Practice Now
              </Button>
            </div>
          </Card>

          {/* Recent Activity */}
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <Card key={activity.id} className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                      {activity.type === 'tutorial' && <Play className="w-4 h-4 text-primary" />}
                      {activity.type === 'challenge' && <Trophy className="w-4 h-4 text-accent" />}
                      {activity.type === 'practice' && <Star className="w-4 h-4 text-primary" />}
                      {activity.type === 'partner' && <Users className="w-4 h-4 text-accent" />}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-text-primary">{activity.title}</div>
                      <div className="text-xs text-text-secondary">{activity.time}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h2 className="text-lg font-semibold text-text-primary mb-2">Your Achievements</h2>
            <p className="text-text-secondary">
              {achievements.filter(a => a.earned).length} of {achievements.length} unlocked
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`p-4 ${
                  achievement.earned
                    ? 'border-accent/40 bg-accent/5'
                    : 'opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-text-secondary mb-2">
                      {achievement.description}
                    </p>
                    {achievement.earned ? (
                      <div className="flex items-center gap-1 text-accent text-sm">
                        <Award className="w-3 h-3" />
                        Earned
                      </div>
                    ) : (
                      <div className="text-text-secondary text-sm">
                        Not yet earned
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-text-primary">Practice History</h2>
          
          {/* Weekly Summary */}
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-3">This Week</h3>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-text-secondary mb-1">{day}</div>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                      index < 5
                        ? 'bg-primary text-white'
                        : 'bg-surface text-text-secondary'
                    }`}
                  >
                    {index < 5 ? '✓' : ''}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Monthly Stats */}
          <Card className="p-4">
            <h3 className="font-semibold text-text-primary mb-3">January 2024</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-primary">18</div>
                <div className="text-sm text-text-secondary">Days practiced</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent">32h</div>
                <div className="text-sm text-text-secondary">Total time</div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
