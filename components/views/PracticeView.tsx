'use client';

import { useState, useEffect } from 'react';
import { Users, Play, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TextField } from '@/components/ui/TextField';
import { Select } from '@/components/ui/Dropdown';
import { PracticeSessionCard } from '@/components/features/PracticeSessionCard';
import { Modal } from '@/components/ui/Modal';
import { PracticeSession, DanceTutorial } from '@/lib/types';
import { practiceSessionApi, tutorialApi } from '@/lib/services/api';
import { DANCE_STYLES } from '@/lib/constants';

interface PracticeViewProps {
  currentUserId?: string;
}

export function PracticeView({ currentUserId }: PracticeViewProps) {
  const [sessions, setSessions] = useState<PracticeSession[]>([]);
  const [tutorials, setTutorials] = useState<DanceTutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [sessionsData, tutorialsData] = await Promise.all([
        practiceSessionApi.getAll(),
        tutorialApi.getAll(),
      ]);

      setSessions(sessionsData);
      setTutorials(tutorialsData);
    } catch (error) {
      console.error('Error fetching practice data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSession = async (sessionData: {
    tutorialId?: string;
    sessionType: string;
  }) => {
    if (!currentUserId) return;

    try {
      const newSession = await practiceSessionApi.create({
        userId1: currentUserId,
        tutorialId: sessionData.tutorialId,
        sessionType: sessionData.sessionType as any,
        startTime: new Date().toISOString(),
        isLive: false,
      });

      setSessions(prev => [newSession, ...prev]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating session:', error);
    }
  };

  const handleJoinSession = async (session: PracticeSession) => {
    if (!currentUserId || session.userId2) return;

    try {
      const updatedSession = await practiceSessionApi.update(session.sessionId, {
        userId2: currentUserId,
        isLive: true,
      });

      setSessions(prev =>
        prev.map(s => s.sessionId === session.sessionId ? updatedSession : s)
      );
    } catch (error) {
      console.error('Error joining session:', error);
    }
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = !searchQuery ||
      session.tutorial?.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.user1?.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStyle = selectedStyle === 'all' ||
      session.tutorial?.danceStyle === selectedStyle;

    const matchesType = selectedType === 'all' ||
      session.sessionType === selectedType;

    return matchesSearch && matchesStyle && matchesType;
  });

  const liveSessions = filteredSessions.filter(s => s.isLive);
  const availableSessions = filteredSessions.filter(s => !s.isLive && !s.userId2);

  if (loading) {
    return (
      <div className="px-4 py-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading practice sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Practice Sessions
          </h1>
          <p className="text-text-secondary">
            Join live sessions or create your own practice room
          </p>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          variant="primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Session
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextField
            placeholder="Search sessions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startIcon={<Search className="w-4 h-4" />}
          />

          <Select
            options={[
              { value: 'all', label: 'All Styles' },
              ...DANCE_STYLES.map(style => ({
                value: style.name.toLowerCase(),
                label: style.name
              }))
            ]}
            value={selectedStyle}
            onChange={setSelectedStyle}
            placeholder="Select style"
          />

          <Select
            options={[
              { value: 'all', label: 'All Types' },
              { value: 'solo', label: 'Solo' },
              { value: 'partner', label: 'Partner' },
              { value: 'group', label: 'Group' },
            ]}
            value={selectedType}
            onChange={setSelectedType}
            placeholder="Select type"
          />
        </div>
      </Card>

      {/* Live Sessions */}
      {liveSessions.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            Live Now ({liveSessions.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveSessions.map((session) => (
              <PracticeSessionCard
                key={session.sessionId}
                session={session}
                currentUserId={currentUserId}
                onJoin={handleJoinSession}
                onView={(session) => console.log('View session:', session)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Available Sessions */}
      <div>
        <h2 className="text-xl font-semibold text-text-primary mb-4">
          Available Sessions ({availableSessions.length})
        </h2>

        {availableSessions.length === 0 ? (
          <Card className="p-8 text-center">
            <Users className="w-12 h-12 text-text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              No available sessions
            </h3>
            <p className="text-text-secondary mb-4">
              Be the first to create a practice session!
            </p>
            <Button
              onClick={() => setShowCreateModal(true)}
              variant="primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Session
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableSessions.map((session) => (
              <PracticeSessionCard
                key={session.sessionId}
                session={session}
                currentUserId={currentUserId}
                onJoin={handleJoinSession}
                onView={(session) => console.log('View session:', session)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Create Session Modal */}
      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateSession}
        tutorials={tutorials}
      />
    </div>
  );
}

interface CreateSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: { tutorialId?: string; sessionType: string }) => void;
  tutorials: DanceTutorial[];
}

function CreateSessionModal({
  isOpen,
  onClose,
  onCreate,
  tutorials
}: CreateSessionModalProps) {
  const [selectedTutorial, setSelectedTutorial] = useState<string>('');
  const [sessionType, setSessionType] = useState<string>('solo');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      tutorialId: selectedTutorial || undefined,
      sessionType,
    });
    setSelectedTutorial('');
    setSessionType('solo');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Practice Session"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Select
          options={[
            { value: '', label: 'General Practice (no tutorial)' },
            ...tutorials.map(tutorial => ({
              value: tutorial.tutorialId,
              label: tutorial.title
            }))
          ]}
          value={selectedTutorial}
          onChange={setSelectedTutorial}
          placeholder="Select a tutorial (optional)"
        />

        <Select
          options={[
            { value: 'solo', label: 'Solo Practice' },
            { value: 'partner', label: 'Partner Practice' },
            { value: 'group', label: 'Group Practice' },
          ]}
          value={sessionType}
          onChange={setSessionType}
          placeholder="Select session type"
        />

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Session
          </Button>
        </div>
      </form>
    </Modal>
  );
}

