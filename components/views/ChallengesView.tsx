'use client';

import { useState, useEffect } from 'react';
import { Trophy, Plus, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TextField } from '@/components/ui/TextField';
import { Select } from '@/components/ui/Dropdown';
import { ChallengeCard } from '@/components/features/ChallengeCard';
import { Modal } from '@/components/ui/Modal';
import { Challenge, Submission } from '@/lib/types';
import { challengeApi, submissionApi } from '@/lib/services/api';

interface ChallengesViewProps {
  currentUserId?: string;
}

export function ChallengesView({ currentUserId }: ChallengesViewProps) {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [challengesData, submissionsData] = await Promise.all([
        challengeApi.getAll(),
        currentUserId ? submissionApi.getAll({ userId: currentUserId }) : Promise.resolve([])
      ]);

      setChallenges(challengesData);
      setSubmissions(submissionsData);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateChallenge = async (challengeData: {
    title: string;
    description: string;
    difficulty: string;
    startDate: string;
    endDate: string;
    prize?: string;
  }) => {
    if (!currentUserId) return;

    try {
      const newChallenge = await challengeApi.create({
        ...challengeData,
        creatorId: currentUserId,
        participantCount: 0,
        tags: [],
      });

      setChallenges(prev => [newChallenge, ...prev]);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  const handleJoinChallenge = async (challenge: Challenge) => {
    // In a real app, this would update the challenge's participant count
    console.log('Joining challenge:', challenge.title);
  };

  const handleSubmitToChallenge = async (challenge: Challenge) => {
    // In a real app, this would open a submission modal
    console.log('Submitting to challenge:', challenge.title);
  };

  const getChallengeStatus = (challenge: Challenge) => {
    const now = new Date();
    const start = new Date(challenge.startDate);
    const end = new Date(challenge.endDate);

    if (now < start) return 'upcoming';
    if (now > end) return 'ended';
    return 'active';
  };

  const hasUserSubmitted = (challengeId: string) => {
    return submissions.some(sub => sub.challengeId === challengeId);
  };

  const filteredChallenges = challenges.filter(challenge => {
    const matchesSearch = !searchQuery ||
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty = selectedDifficulty === 'all' ||
      challenge.difficulty === selectedDifficulty;

    const status = getChallengeStatus(challenge);
    const matchesStatus = selectedStatus === 'all' || status === selectedStatus;

    return matchesSearch && matchesDifficulty && matchesStatus;
  });

  const activeChallenges = filteredChallenges.filter(c => getChallengeStatus(c) === 'active');
  const upcomingChallenges = filteredChallenges.filter(c => getChallengeStatus(c) === 'upcoming');
  const endedChallenges = filteredChallenges.filter(c => getChallengeStatus(c) === 'ended');

  if (loading) {
    return (
      <div className="px-4 py-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading challenges...</p>
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
            Dance Challenges
          </h1>
          <p className="text-text-secondary">
            Join trending challenges and showcase your moves
          </p>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          variant="primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Challenge
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextField
            placeholder="Search challenges..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startIcon={<Search className="w-4 h-4" />}
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

          <Select
            options={[
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'upcoming', label: 'Upcoming' },
              { value: 'ended', label: 'Ended' },
            ]}
            value={selectedStatus}
            onChange={setSelectedStatus}
            placeholder="Select status"
          />
        </div>
      </Card>

      {/* Active Challenges */}
      {activeChallenges.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            Active Challenges ({activeChallenges.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.challengeId}
                challenge={challenge}
                currentUserId={currentUserId}
                hasSubmitted={hasUserSubmitted(challenge.challengeId)}
                onJoin={handleJoinChallenge}
                onView={(challenge) => console.log('View challenge:', challenge)}
                onSubmit={handleSubmitToChallenge}
              />
            ))}
          </div>
        </div>
      )}

      {/* Upcoming Challenges */}
      {upcomingChallenges.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Upcoming Challenges ({upcomingChallenges.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.challengeId}
                challenge={challenge}
                currentUserId={currentUserId}
                onView={(challenge) => console.log('View challenge:', challenge)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Ended Challenges */}
      {endedChallenges.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-text-primary mb-4">
            Past Challenges ({endedChallenges.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {endedChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.challengeId}
                challenge={challenge}
                currentUserId={currentUserId}
                onView={(challenge) => console.log('View challenge:', challenge)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredChallenges.length === 0 && (
        <Card className="p-8 text-center">
          <Trophy className="w-12 h-12 text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            No challenges found
          </h3>
          <p className="text-text-secondary mb-4">
            {searchQuery || selectedDifficulty !== 'all' || selectedStatus !== 'all'
              ? 'Try adjusting your filters or search terms.'
              : 'Be the first to create a dance challenge!'
            }
          </p>
          <Button
            onClick={() => setShowCreateModal(true)}
            variant="primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Challenge
          </Button>
        </Card>
      )}

      {/* Create Challenge Modal */}
      <CreateChallengeModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateChallenge}
      />
    </div>
  );
}

interface CreateChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: {
    title: string;
    description: string;
    difficulty: string;
    startDate: string;
    endDate: string;
    prize?: string;
  }) => void;
}

function CreateChallengeModal({
  isOpen,
  onClose,
  onCreate
}: CreateChallengeModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'beginner',
    startDate: '',
    endDate: '',
    prize: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({
      title: '',
      description: '',
      difficulty: 'beginner',
      startDate: '',
      endDate: '',
      prize: '',
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Dance Challenge"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          label="Challenge Title"
          value={formData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          placeholder="Enter challenge title"
          fullWidth
        />

        <TextArea
          label="Description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your challenge..."
          fullWidth
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            options={[
              { value: 'beginner', label: 'Beginner' },
              { value: 'intermediate', label: 'Intermediate' },
              { value: 'advanced', label: 'Advanced' },
            ]}
            value={formData.difficulty}
            onChange={(value) => handleInputChange('difficulty', value)}
            placeholder="Select difficulty"
          />

          <TextField
            label="Prize (optional)"
            value={formData.prize}
            onChange={(e) => handleInputChange('prize', e.target.value)}
            placeholder="e.g., 5 USDC"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <TextField
            label="Start Date"
            type="datetime-local"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
            fullWidth
          />

          <TextField
            label="End Date"
            type="datetime-local"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            fullWidth
          />
        </div>

        <div className="flex gap-3 justify-end">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Create Challenge
          </Button>
        </div>
      </form>
    </Modal>
  );
}

