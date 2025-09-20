import { DanceTutorial, Challenge } from './types';

// Mock data for tutorials
export const MOCK_TUTORIALS: DanceTutorial[] = [
  {
    tutorialId: '1',
    title: 'Hip-Hop Basics: The Bounce',
    description: 'Learn the fundamental bounce movement that forms the foundation of hip-hop dance.',
    videoUrl: '/videos/hip-hop-bounce.mp4',
    danceStyle: 'hip-hop',
    difficulty: 'beginner',
    duration: 180,
    thumbnailUrl: '/images/hip-hop-bounce-thumb.jpg',
    instructor: 'DJ Mike',
    tags: ['basics', 'foundation', 'rhythm'],
  },
  {
    tutorialId: '2',
    title: 'Contemporary Flow: Emotional Expression',
    description: 'Explore fluid movements and emotional storytelling through contemporary dance.',
    videoUrl: '/videos/contemporary-flow.mp4',
    danceStyle: 'contemporary',
    difficulty: 'intermediate',
    duration: 240,
    thumbnailUrl: '/images/contemporary-flow-thumb.jpg',
    instructor: 'Sarah Chen',
    tags: ['flow', 'emotion', 'storytelling'],
  },
  {
    tutorialId: '3',
    title: 'K-Pop Choreography: Dynamic Moves',
    description: 'Master the sharp, synchronized movements that define K-Pop dance style.',
    videoUrl: '/videos/kpop-dynamic.mp4',
    danceStyle: 'kpop',
    difficulty: 'intermediate',
    duration: 200,
    thumbnailUrl: '/images/kpop-dynamic-thumb.jpg',
    instructor: 'Luna Park',
    tags: ['kpop', 'synchronization', 'energy'],
  },
  {
    tutorialId: '4',
    title: 'Breakdance Power Moves',
    description: 'Advanced breaking techniques including windmills and freezes.',
    videoUrl: '/videos/breakdance-power.mp4',
    danceStyle: 'breakdance',
    difficulty: 'advanced',
    duration: 300,
    thumbnailUrl: '/images/breakdance-power-thumb.jpg',
    instructor: 'B-Boy Storm',
    tags: ['breaking', 'power', 'advanced'],
  },
  {
    tutorialId: '5',
    title: 'Latin Salsa Steps',
    description: 'Learn the passionate and rhythmic steps of traditional salsa dancing.',
    videoUrl: '/videos/latin-salsa.mp4',
    danceStyle: 'salsa',
    difficulty: 'beginner',
    duration: 220,
    thumbnailUrl: '/images/latin-salsa-thumb.jpg',
    instructor: 'Carlos Rivera',
    tags: ['salsa', 'latin', 'partner'],
  },
];

// Mock data for challenges
export const MOCK_CHALLENGES: Challenge[] = [
  {
    challengeId: '1',
    title: 'Freestyle Friday',
    description: 'Show us your best 30-second freestyle routine to your favorite song!',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-07'),
    creatorId: 'admin',
    prize: '100 USDC',
    difficulty: 'easy',
    tags: ['freestyle', 'creativity', 'weekly'],
    participantCount: 156,
  },
  {
    challengeId: '2',
    title: 'Sync Challenge',
    description: 'Partner up and create a perfectly synchronized dance routine.',
    startDate: new Date('2024-01-08'),
    endDate: new Date('2024-01-15'),
    creatorId: 'admin',
    prize: '250 USDC',
    difficulty: 'medium',
    tags: ['sync', 'partner', 'coordination'],
    participantCount: 89,
  },
  {
    challengeId: '3',
    title: 'TikTok Trend Master',
    description: 'Master the latest viral dance trend and add your own creative twist!',
    startDate: new Date('2024-01-10'),
    endDate: new Date('2024-01-17'),
    creatorId: 'trendsetter_01',
    prize: '50 USDC',
    difficulty: 'easy',
    tags: ['viral', 'trend', 'creative'],
    participantCount: 234,
  },
];

// Dance styles with metadata
export const DANCE_STYLES = [
  { name: 'Hip-Hop', emoji: '🎤', color: 'from-orange-500 to-red-500' },
  { name: 'Contemporary', emoji: '🌊', color: 'from-blue-500 to-purple-500' },
  { name: 'K-Pop', emoji: '🌟', color: 'from-pink-500 to-purple-500' },
  { name: 'Breakdance', emoji: '🔥', color: 'from-red-500 to-yellow-500' },
  { name: 'Salsa', emoji: '💃', color: 'from-yellow-500 to-orange-500' },
  { name: 'Ballet', emoji: '🩰', color: 'from-purple-500 to-pink-500' },
  { name: 'Jazz', emoji: '🎷', color: 'from-green-500 to-blue-500' },
  { name: 'Freestyle', emoji: '⚡', color: 'from-cyan-500 to-blue-500' },
];

// App navigation items
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: 'Home' },
  { id: 'tutorials', label: 'Tutorials', icon: 'Play' },
  { id: 'practice', label: 'Practice', icon: 'Users' },
  { id: 'challenges', label: 'Challenges', icon: 'Trophy' },
  { id: 'profile', label: 'Profile', icon: 'User' },
];

// Pricing tiers for micro-transactions
export const PRICING_TIERS = {
  AI_FEEDBACK_BASIC: { price: 0.5, currency: 'USDC', description: 'Basic AI feedback' },
  AI_FEEDBACK_PREMIUM: { price: 2.0, currency: 'USDC', description: 'Detailed AI analysis' },
  TUTORIAL_PACK: { price: 5.0, currency: 'USDC', description: 'Premium tutorial pack' },
  PRACTICE_ROOM_HOUR: { price: 1.0, currency: 'USDC', description: '1 hour practice room' },
};
