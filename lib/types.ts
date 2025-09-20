// User Types
export interface User {
  userId: string; // Farcaster FID
  username: string;
  profilePicUrl: string;
  walletAddress?: string;
}

// Dance Tutorial Types
export interface DanceTutorial {
  tutorialId: string;
  title: string;
  description: string;
  videoUrl: string;
  danceStyle: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in seconds
  thumbnailUrl: string;
  instructor: string;
  tags: string[];
}

// Practice Session Types
export interface PracticeSession {
  sessionId: string;
  userId1: string;
  userId2?: string; // optional for solo practice
  tutorialId?: string;
  startTime: Date;
  endTime?: Date;
  isLive: boolean;
  sessionType: 'solo' | 'partner' | 'group';
  recordingUrl?: string;
}

// Challenge Types
export interface Challenge {
  challengeId: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  creatorId: string;
  prize?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tags: string[];
  participantCount: number;
}

// Submission Types
export interface Submission {
  submissionId: string;
  challengeId: string;
  userId: string;
  videoUrl: string;
  timestamp: Date;
  likes: number;
  views: number;
  title?: string;
  description?: string;
}

// AI Feedback Types
export interface AIFeedback {
  feedbackId: string;
  sessionId: string;
  userId: string;
  overallScore: number; // 0-100
  rhythmScore: number;
  formScore: number;
  energyScore: number;
  suggestions: string[];
  timestamp: Date;
  isPremium: boolean;
}

// App State Types
export interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  currentView: 'home' | 'tutorials' | 'practice' | 'challenges' | 'profile';
  isLoading: boolean;
}

// Component Props Types
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export interface AvatarProps {
  src?: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
  className?: string;
}
