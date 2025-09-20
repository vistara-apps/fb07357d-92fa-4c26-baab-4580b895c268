import type {
  User,
  DanceTutorial,
  PracticeSession,
  Challenge,
  Submission,
  AIFeedback
} from '@/lib/types';

// Base API URL
const API_BASE = '/api';

// Generic API functions
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

// User API
export const userApi = {
  getAll: () => apiRequest<User[]>('/users'),
  getById: (userId: string) => apiRequest<User>(`/users?userId=${userId}`),
  create: (user: Omit<User, 'createdAt' | 'updatedAt'>) =>
    apiRequest<User>('/users', {
      method: 'POST',
      body: JSON.stringify(user),
    }),
  update: (userId: string, user: Partial<User>) =>
    apiRequest<User>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    }),
};

// Tutorial API
export const tutorialApi = {
  getAll: (filters?: { style?: string; difficulty?: string; search?: string }) => {
    const params = new URLSearchParams();
    if (filters?.style && filters.style !== 'all') params.append('style', filters.style);
    if (filters?.difficulty && filters.difficulty !== 'all') params.append('difficulty', filters.difficulty);
    if (filters?.search) params.append('search', filters.search);

    return apiRequest<DanceTutorial[]>(`/tutorials?${params.toString()}`);
  },
  getById: (tutorialId: string) => apiRequest<DanceTutorial>(`/tutorials/${tutorialId}`),
  create: (tutorial: Omit<DanceTutorial, 'tutorialId' | 'createdAt' | 'updatedAt'>) =>
    apiRequest<DanceTutorial>('/tutorials', {
      method: 'POST',
      body: JSON.stringify(tutorial),
    }),
};

// Challenge API
export const challengeApi = {
  getAll: () => apiRequest<Challenge[]>('/challenges'),
  getById: (challengeId: string) => apiRequest<Challenge>(`/challenges/${challengeId}`),
  create: (challenge: Omit<Challenge, 'challengeId' | 'createdAt' | 'updatedAt' | 'participantCount'>) =>
    apiRequest<Challenge>('/challenges', {
      method: 'POST',
      body: JSON.stringify(challenge),
    }),
};

// Practice Session API
export const practiceSessionApi = {
  getAll: (filters?: { userId?: string; isLive?: boolean }) => {
    const params = new URLSearchParams();
    if (filters?.userId) params.append('userId', filters.userId);
    if (filters?.isLive !== undefined) params.append('isLive', filters.isLive.toString());

    return apiRequest<PracticeSession[]>(`/practice-sessions?${params.toString()}`);
  },
  getById: (sessionId: string) => apiRequest<PracticeSession>(`/practice-sessions/${sessionId}`),
  create: (session: Omit<PracticeSession, 'sessionId' | 'createdAt' | 'updatedAt'>) =>
    apiRequest<PracticeSession>('/practice-sessions', {
      method: 'POST',
      body: JSON.stringify(session),
    }),
  update: (sessionId: string, session: Partial<PracticeSession>) =>
    apiRequest<PracticeSession>(`/practice-sessions/${sessionId}`, {
      method: 'PUT',
      body: JSON.stringify(session),
    }),
};

// Submission API
export const submissionApi = {
  getAll: (filters?: { challengeId?: string; userId?: string }) => {
    const params = new URLSearchParams();
    if (filters?.challengeId) params.append('challengeId', filters.challengeId);
    if (filters?.userId) params.append('userId', filters.userId);

    return apiRequest<Submission[]>(`/submissions?${params.toString()}`);
  },
  getById: (submissionId: string) => apiRequest<Submission>(`/submissions/${submissionId}`),
  create: (submission: Omit<Submission, 'submissionId' | 'createdAt' | 'updatedAt'>) =>
    apiRequest<Submission>('/submissions', {
      method: 'POST',
      body: JSON.stringify(submission),
    }),
};

// AI Feedback API
export const aiFeedbackApi = {
  create: (feedback: {
    sessionId: string;
    userId: string;
    videoDescription: string;
    isPremium?: boolean;
  }) =>
    apiRequest<AIFeedback>('/ai-feedback', {
      method: 'POST',
      body: JSON.stringify(feedback),
    }),
  getBySession: (sessionId: string) =>
    apiRequest<AIFeedback[]>(`/ai-feedback?sessionId=${sessionId}`),
};

