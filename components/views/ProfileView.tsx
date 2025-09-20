'use client';

import { useState, useEffect } from 'react';
import { User, Trophy, Play, Users, Settings, LogOut } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Tabs, SimpleTabs } from '@/components/ui/Tabs';
import { User as UserType, PracticeSession, Submission } from '@/lib/types';
import { practiceSessionApi, submissionApi } from '@/lib/services/api';

interface ProfileViewProps {
  user: UserType;
  onLogout: () => void;
}

export function ProfileView({ user, onLogout }: ProfileViewProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const [userSessions, userSubmissions] = await Promise.all([
          practiceSessionApi.getAll({ userId: user.userId }),
          submissionApi.getAll({ userId: user.userId }),
        ]);

        setSessions(userSessions);
        setSubmissions(userSubmissions);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user.userId]);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'sessions', label: 'Practice Sessions' },
    { id: 'submissions', label: 'Challenge Submissions' },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Play className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-text-primary">{sessions.length}</div>
          <div className="text-sm text-text-secondary">Sessions</div>
        </Card>

        <Card className="p-4 text-center">
          <Users className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-text-primary">
            {sessions.filter(s => s.userId2).length}
          </div>
          <div className="text-sm text-text-secondary">Partner Sessions</div>
        </Card>

        <Card className="p-4 text-center">
          <Trophy className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-text-primary">{submissions.length}</div>
          <div className="text-sm text-text-secondary">Submissions</div>
        </Card>

        <Card className="p-4 text-center">
          <User className="w-8 h-8 text-primary mx-auto mb-2" />
          <div className="text-2xl font-bold text-text-primary">1</div>
          <div className="text-sm text-text-secondary">Level</div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-text-primary mb-4">
          Recent Activity
        </h3>

        {sessions.length === 0 && submissions.length === 0 ? (
          <p className="text-text-secondary text-center py-8">
            No activity yet. Start practicing to see your progress here!
          </p>
        ) : (
          <div className="space-y-4">
            {sessions.slice(0, 3).map((session) => (
              <div key={session.sessionId} className="flex items-center gap-3 p-3 bg-surface rounded-md">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-text-primary font-medium">
                    {session.sessionType === 'solo' ? 'Solo Practice' : 'Partner Practice'}
                  </p>
                  <p className="text-text-secondary text-sm">
                    {session.tutorial?.title || 'General Practice'}
                  </p>
                </div>
                <Badge variant="secondary" size="sm">
                  {new Date(session.startTime).toLocaleDateString()}
                </Badge>
              </div>
            ))}

            {submissions.slice(0, 2).map((submission) => (
              <div key={submission.submissionId} className="flex items-center gap-3 p-3 bg-surface rounded-md">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <div className="flex-1">
                  <p className="text-text-primary font-medium">
                    Submitted to {submission.challenge?.title || 'Challenge'}
                  </p>
                  <p className="text-text-secondary text-sm">
                    {submission.title || 'Dance submission'}
                  </p>
                </div>
                <Badge variant="success" size="sm">
                  Submitted
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );

  const renderSessions = () => (
    <div className="space-y-4">
      {sessions.length === 0 ? (
        <Card className="p-8 text-center">
          <Play className="w-12 h-12 text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No practice sessions yet
          </h3>
          <p className="text-text-secondary mb-4">
            Start your first practice session to track your progress!
          </p>
          <Button variant="primary">Start Practicing</Button>
        </Card>
      ) : (
        sessions.map((session) => (
          <Card key={session.sessionId} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">
                    {session.sessionType === 'solo' ? 'Solo Practice' : 'Partner Practice'}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {session.tutorial?.title || 'General Practice'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <Badge variant={session.isLive ? 'success' : 'secondary'} size="sm">
                  {session.isLive ? 'Live' : 'Completed'}
                </Badge>
                <p className="text-text-secondary text-sm mt-1">
                  {new Date(session.startTime).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  const renderSubmissions = () => (
    <div className="space-y-4">
      {submissions.length === 0 ? (
        <Card className="p-8 text-center">
          <Trophy className="w-12 h-12 text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No submissions yet
          </h3>
          <p className="text-text-secondary mb-4">
            Join a challenge and submit your best dance moves!
          </p>
          <Button variant="primary">Browse Challenges</Button>
        </Card>
      ) : (
        submissions.map((submission) => (
          <Card key={submission.submissionId} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-text-primary">
                    {submission.title || 'Dance Submission'}
                  </h4>
                  <p className="text-text-secondary text-sm">
                    {submission.challenge?.title || 'Challenge'}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-text-secondary text-sm">
                    {submission.likes} likes
                  </span>
                  <span className="text-text-secondary text-sm">
                    {submission.views} views
                  </span>
                </div>
                <Badge variant="success" size="sm">
                  Submitted
                </Badge>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="px-4 py-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar
            src={user.profilePicUrl}
            alt={user.username}
            fallback={user.username[0]}
            size="xl"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-text-primary mb-1">
              {user.username}
            </h1>
            <p className="text-text-secondary font-mono text-sm">
              {user.walletAddress}
            </p>
          </div>
          <Button
            onClick={onLogout}
            variant="destructive"
            size="sm"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </Card>

      {/* Tabs */}
      <SimpleTabs
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'sessions' && renderSessions()}
        {activeTab === 'submissions' && renderSubmissions()}
      </div>
    </div>
  );
}

