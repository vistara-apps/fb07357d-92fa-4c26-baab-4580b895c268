import { useState, useCallback } from 'react';
import { User, AppState } from '@/lib/types';

export function useAppState() {
  const [appState, setAppState] = useState<AppState>({
    currentUser: null,
    isAuthenticated: false,
    currentView: 'home',
    isLoading: true,
  });

  const setCurrentUser = useCallback((user: User | null) => {
    setAppState(prev => ({
      ...prev,
      currentUser: user,
      isAuthenticated: user !== null,
    }));
  }, []);

  const setCurrentView = useCallback((view: AppState['currentView']) => {
    setAppState(prev => ({
      ...prev,
      currentView: view,
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setAppState(prev => ({
      ...prev,
      isLoading: loading,
    }));
  }, []);

  const resetAppState = useCallback(() => {
    setAppState({
      currentUser: null,
      isAuthenticated: false,
      currentView: 'home',
      isLoading: false,
    });
  }, []);

  return {
    ...appState,
    setCurrentUser,
    setCurrentView,
    setLoading,
    resetAppState,
  };
}

