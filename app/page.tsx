'use client';

import { AppShell } from '@/components/layout/AppShell';
import { HomeView } from '@/components/views/HomeView';
import { TutorialsView } from '@/components/views/TutorialsView';
import { PracticeView } from '@/components/views/PracticeView';
import { ChallengesView } from '@/components/views/ChallengesView';
import { ProfileView } from '@/components/views/ProfileView';
import { AuthView } from '@/components/views/AuthView';
import { useAppState } from '@/lib/hooks/useAppState';

export default function Home() {
  const { appState, setCurrentUser, setCurrentView } = useAppState();

  const handleAuth = (user: any) => {
    setCurrentUser(user);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('home');
  };

  const renderCurrentView = () => {
    switch (appState.currentView) {
      case 'home':
        return (
          <HomeView
            onPlayTutorial={(tutorial) => console.log('Play tutorial:', tutorial)}
            onPracticeTutorial={(tutorial) => console.log('Practice tutorial:', tutorial)}
            onViewChallenge={(challenge) => console.log('View challenge:', challenge)}
          />
        );
      case 'tutorials':
        return (
          <TutorialsView
            onPlayTutorial={(tutorial) => console.log('Play tutorial:', tutorial)}
            onPracticeTutorial={(tutorial) => console.log('Practice tutorial:', tutorial)}
          />
        );
      case 'practice':
        return <PracticeView currentUserId={appState.currentUser?.userId} />;
      case 'challenges':
        return <ChallengesView currentUserId={appState.currentUser?.userId} />;
      case 'profile':
        return (
          <ProfileView
            user={appState.currentUser!}
            onLogout={handleLogout}
          />
        );
      default:
        return (
          <HomeView
            onPlayTutorial={(tutorial) => console.log('Play tutorial:', tutorial)}
            onPracticeTutorial={(tutorial) => console.log('Practice tutorial:', tutorial)}
            onViewChallenge={(challenge) => console.log('View challenge:', challenge)}
          />
        );
    }
  };

  if (appState.isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">💃</span>
          </div>
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary text-lg">Loading GrooveSync...</p>
          <p className="text-text-secondary text-sm mt-2">Syncing your moves</p>
        </div>
      </div>
    );
  }

  if (!appState.isAuthenticated || !appState.currentUser) {
    return <AuthView onAuthSuccess={handleAuth} />;
  }

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
