'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { AppShell } from '@/components/layout/AppShell';
import { HomeView } from '@/components/views/HomeView';
import { TutorialsView } from '@/components/views/TutorialsView';
import { PracticeView } from '@/components/views/PracticeView';
import { ChallengesView } from '@/components/views/ChallengesView';
import { ProfileView } from '@/components/views/ProfileView';
import { AuthView } from '@/components/views/AuthView';
import { AppState } from '@/lib/types';

export default function Home() {
  const { user } = useMiniKit();
  const [appState, setAppState] = useState<AppState>({
    currentUser: null,
    isAuthenticated: false,
    currentView: 'home',
    isLoading: true,
  });

  useEffect(() => {
    // Simulate authentication check
    const timer = setTimeout(() => {
      if (user) {
        setAppState(prev => ({
          ...prev,
          currentUser: {
            userId: user.fid?.toString() || 'demo-user',
            username: user.displayName || 'Anonymous',
            profilePicUrl: user.pfpUrl || '',
            walletAddress: user.custody?.address,
          },
          isAuthenticated: true,
          isLoading: false,
        }));
      } else {
        setAppState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  const handleViewChange = (view: string) => {
    setAppState(prev => ({ ...prev, currentView: view }));
  };

  const handleAuth = () => {
    // This would trigger the MiniKit auth flow
    setAppState(prev => ({
      ...prev,
      currentUser: {
        userId: 'demo-user',
        username: 'Demo User',
        profilePicUrl: '',
      },
      isAuthenticated: true,
    }));
  };

  if (appState.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mb-4 animate-pulse-glow mx-auto">
            <span className="text-white font-bold text-xl">G</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">GrooveSync</h1>
          <p className="text-text-secondary">Loading your dance experience...</p>
        </div>
      </div>
    );
  }

  if (!appState.isAuthenticated) {
    return <AuthView onAuth={handleAuth} />;
  }

  const renderCurrentView = () => {
    switch (appState.currentView) {
      case 'home':
        return <HomeView />;
      case 'tutorials':
        return <TutorialsView />;
      case 'practice':
        return <PracticeView />;
      case 'challenges':
        return <ChallengesView />;
      case 'profile':
        return <ProfileView user={appState.currentUser} />;
      default:
        return <HomeView />;
    }
  };

  return (
    <AppShell
      currentView={appState.currentView}
      onViewChange={handleViewChange}
      user={appState.currentUser}
    >
      {renderCurrentView()}
    </AppShell>
  );
}
