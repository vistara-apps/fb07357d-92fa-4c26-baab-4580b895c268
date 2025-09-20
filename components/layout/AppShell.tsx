'use client';

import { useState } from 'react';
import { Home, Play, Users, Trophy, User, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';

interface AppShellProps {
  children: React.ReactNode;
  currentView: 'home' | 'tutorials' | 'practice' | 'challenges' | 'profile';
  onViewChange: (view: 'home' | 'tutorials' | 'practice' | 'challenges' | 'profile') => void;
  user?: {
    userId: string;
    username: string;
    profilePicUrl: string;
    walletAddress?: string;
  } | null;
}

const navItems: Array<{
  id: 'home' | 'tutorials' | 'practice' | 'challenges' | 'profile';
  label: string;
  icon: any;
}> = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'tutorials', label: 'Tutorials', icon: Play },
  { id: 'practice', label: 'Practice', icon: Users },
  { id: 'challenges', label: 'Challenges', icon: Trophy },
  { id: 'profile', label: 'Profile', icon: User },
];

export function AppShell({
  children,
  currentView,
  onViewChange,
  user,
}: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-surface/20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <h1 className="text-xl font-bold text-text-primary">GrooveSync</h1>
            </div>
            
            <div className="flex items-center gap-3">
              {user && (
                <Avatar
                  src={user.profilePicUrl}
                  alt={user.username}
                  size="sm"
                />
              )}
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden"
              >
                {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-lg md:hidden">
          <div className="pt-20 px-4">
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onViewChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200',
                      currentView === item.id
                        ? 'bg-primary text-white'
                        : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pb-20 md:pb-4">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-lg border-t border-surface/20 md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors duration-200',
                  isActive
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                <Icon className={cn('w-5 h-5', isActive && 'animate-dance-bounce')} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
