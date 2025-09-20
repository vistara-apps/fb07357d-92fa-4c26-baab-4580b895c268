'use client';

import { useState } from 'react';
import { Users, Plus, Clock, Video, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PracticeSessionCard } from '@/components/features/PracticeSessionCard';
import { PracticeSession } from '@/lib/types';
import { generateId } from '@/lib/utils';

export function PracticeView() {
  const [activeTab, setActiveTab] = useState<'live' | 'solo' | 'ai'>('live');

  // Mock practice sessions
  const mockSessions: PracticeSession[] = [
    {
      sessionId: '1',
      userId1: 'user1',
      userId2: 'user2',
      tutorialId: '1',
      startTime: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      isLive: true,
      sessionType: 'partner',
    },
    {
      sessionId: '2',
      userId1: 'user3',
      startTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
      isLive: true,
      sessionType: 'solo',
    },
    {
      sessionId: '3',
      userId1: 'user4',
      userId2: 'user5',
      startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      endTime: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      isLive: false,
      sessionType: 'partner',
      recordingUrl: '/recordings/session3.mp4',
    },
  ];

  const liveSessions = mockSessions.filter(s => s.isLive);
  const pastSessions = mockSessions.filter(s => !s.isLive);

  const handleJoinSession = (session: PracticeSession) => {
    console.log('Joining session:', session.sessionId);
  };

  const handleWatchSession = (session: PracticeSession) => {
    console.log('Watching session:', session.sessionId);
  };

  const handleStartSoloSession = () => {
    console.log('Starting solo practice session');
  };

  const handleStartAISession = () => {
    console.log('Starting AI feedback session');
  };

  const handleFindPartner = () => {
    console.log('Finding practice partner');
  };

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-text-primary mb-2">Practice Sessions</h1>
        <p className="text-text-secondary">Practice solo, with partners, or get AI feedback</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={handleStartSoloSession}>
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Video className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-text-primary mb-1">Solo Practice</h3>
          <p className="text-sm text-text-secondary mb-3">Practice at your own pace</p>
          <Button variant="primary" size="sm" className="w-full">
            Start Solo
          </Button>
        </Card>

        <Card className="p-4 text-center hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={handleFindPartner}>
          <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Users className="w-6 h-6 text-accent" />
          </div>
          <h3 className="font-semibold text-text-primary mb-1">Find Partner</h3>
          <p className="text-sm text-text-secondary mb-3">Connect with other dancers</p>
          <Button variant="accent" size="sm" className="w-full">
            Find Partner
          </Button>
        </Card>

        <Card className="p-4 text-center hover:shadow-lg transition-all duration-200 cursor-pointer" onClick={handleStartAISession}>
          <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-semibold text-text-primary mb-1">AI Feedback</h3>
          <p className="text-sm text-text-secondary mb-3">Get instant analysis</p>
          <Button variant="primary" size="sm" className="w-full">
            Start AI Session
          </Button>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-surface/30 rounded-lg p-1">
        {[
          { id: 'live', label: 'Live Sessions', icon: Clock },
          { id: 'solo', label: 'Solo Practice', icon: Video },
          { id: 'ai', label: 'AI Feedback', icon: Zap },
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

      {/* Content based on active tab */}
      {activeTab === 'live' && (
        <div className="space-y-6">
          {/* Live Sessions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-text-primary flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                Live Sessions ({liveSessions.length})
              </h2>
              <Button variant="secondary" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Create Session
              </Button>
            </div>
            
            {liveSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {liveSessions.map((session) => (
                  <PracticeSessionCard
                    key={session.sessionId}
                    session={session}
                    onJoin={handleJoinSession}
                    onWatch={handleWatchSession}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  No live sessions right now
                </h3>
                <p className="text-text-secondary mb-4">
                  Be the first to start a practice session!
                </p>
                <Button variant="primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Start New Session
                </Button>
              </Card>
            )}
          </div>

          {/* Recent Sessions */}
          <div>
            <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Sessions</h2>
            {pastSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pastSessions.map((session) => (
                  <PracticeSessionCard
                    key={session.sessionId}
                    session={session}
                    onJoin={handleJoinSession}
                    onWatch={handleWatchSession}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-6 text-center">
                <p className="text-text-secondary">No recent sessions to show</p>
              </Card>
            )}
          </div>
        </div>
      )}

      {activeTab === 'solo' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">Solo Practice Mode</h2>
            <p className="text-text-secondary mb-4">
              Practice at your own pace with our guided sessions. Perfect for building confidence and mastering new moves.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="primary" size="lg" className="w-full">
                <Video className="w-5 h-5 mr-2" />
                Start Free Practice
              </Button>
              <Button variant="secondary" size="lg" className="w-full">
                <Clock className="w-5 h-5 mr-2" />
                Guided Session
              </Button>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-text-primary mb-4">AI Feedback Sessions</h2>
            <p className="text-text-secondary mb-4">
              Get instant feedback on your dance moves with our AI-powered analysis system.
            </p>
            
            {/* Pricing Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Card className="p-4 border border-surface/40">
                <h3 className="font-semibold text-text-primary mb-2">Basic Feedback</h3>
                <div className="text-2xl font-bold text-primary mb-2">0.5 USDC</div>
                <ul className="text-sm text-text-secondary space-y-1 mb-4">
                  <li>• Rhythm analysis</li>
                  <li>• Basic form feedback</li>
                  <li>• Overall score</li>
                </ul>
                <Button variant="primary" size="sm" className="w-full">
                  Try Basic
                </Button>
              </Card>
              
              <Card className="p-4 border border-accent/40">
                <h3 className="font-semibold text-text-primary mb-2">Premium Analysis</h3>
                <div className="text-2xl font-bold text-accent mb-2">2.0 USDC</div>
                <ul className="text-sm text-text-secondary space-y-1 mb-4">
                  <li>• Detailed movement analysis</li>
                  <li>• Personalized suggestions</li>
                  <li>• Progress tracking</li>
                  <li>• Video breakdown</li>
                </ul>
                <Button variant="accent" size="sm" className="w-full">
                  Get Premium
                </Button>
              </Card>
            </div>
            
            <Button variant="secondary" size="lg" className="w-full">
              <Zap className="w-5 h-5 mr-2" />
              Upload Practice Video
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
