// User Types
export interface User {
  userId: string; // Farcaster FID
  username: string;
  profilePicUrl?: string;
  walletAddress?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Dance Tutorial Types
export interface DanceTutorial {
  tutorialId: string;
  title: string;
  description: string;
  videoUrl: string;
  danceStyle: string;
  difficulty: string; // 'beginner' | 'intermediate' | 'advanced'
  duration: number; // in seconds
  thumbnailUrl: string;
  instructor: string;
  tags: string[]; // JSON array of tags
  createdAt?: string;
  updatedAt?: string;
}

// Practice Session Types
export interface PracticeSession {
  sessionId: string;
  userId1: string;
  userId2?: string; // optional for solo practice
  tutorialId?: string;
  startTime: string;
  endTime?: string;
  isLive: boolean;
  sessionType: string; // 'solo' | 'partner' | 'group'
  recordingUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  user1?: User;
  user2?: User;
  tutorial?: Partial<DanceTutorial>;
  aiFeedbacks?: AIFeedback[];
}

// Challenge Types
export interface Challenge {
  challengeId: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  creatorId: string;
  prize?: string;
  difficulty: string; // 'easy' | 'medium' | 'hard'
  tags: string[]; // JSON array of tags
  participantCount: number;
  createdAt?: string;
  updatedAt?: string;
  creator?: User;
  submissions?: Submission[];
}

// Submission Types
export interface Submission {
  submissionId: string;
  challengeId: string;
  userId: string;
  videoUrl: string;
  timestamp: string;
  likes: number;
  views: number;
  title?: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  user?: User;
  challenge?: Partial<Challenge>;
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
  suggestions: string[]; // JSON array of suggestions
  timestamp: string;
  isPremium: boolean;
  createdAt?: string;
  updatedAt?: string;
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
