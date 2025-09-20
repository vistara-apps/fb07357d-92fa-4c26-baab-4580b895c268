'use client';

import { useState } from 'react';
import {
  Home,
  Play,
  Users,
  Trophy,
  User,
  Menu,
  X,
  Bell,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { User as UserType } from '@/lib/types';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
  user?: UserType;
  onUserMenu?: () => void;
}

export function AppShell({
  children,
  currentView,
  onViewChange,
  user,
  onUserMenu
}: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleViewChange = (view: string) => {
    onViewChange(view);
    setIsMobileMenuOpen(false);
  };

  const getNavIcon = (iconName: string) => {
    const icons = {
      home: Home,
      tutorials: Play,
      practice: Users,
      challenges: Trophy,
      profile: User,
    };
    return icons[iconName as keyof typeof icons] || Home;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-surface/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">G</span>
              </div>
              <h1 className="text-xl font-bold text-text-primary hidden sm:block">
                GrooveSync
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const Icon = getNavIcon(item.id);
                const isActive = currentView === item.id;

                return (
                  <Button
                    key={item.id}
                    variant={isActive ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => handleViewChange(item.id)}
                    className="gap-2"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            {/* User Menu */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                <Badge
                  variant="destructive"
                  size="sm"
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>

              {/* User Avatar */}
              {user ? (
                <div className="flex items-center gap-3">
                  <Avatar
                    src={user.profilePicUrl}
                    alt={user.username}
                    fallback={user.username[0]}
                    size="sm"
                  />
                  <span className="text-sm text-text-primary hidden sm:block">
                    {user.username}
                  </span>
                </div>
              ) : (
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-surface">
            <nav className="container mx-auto px-4 py-4">
              <div className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => {
                  const Icon = getNavIcon(item.id);
                  const isActive = currentView === item.id;

                  return (
                    <Button
                      key={item.id}
                      variant={isActive ? 'primary' : 'ghost'}
                      size="sm"
                      onClick={() => handleViewChange(item.id)}
                      className="justify-start gap-3 w-full"
                    >
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface border-t border-white/10">
        <div className="flex items-center justify-center">
          {NAV_ITEMS.map((item) => {
            const Icon = getNavIcon(item.id);
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleViewChange(item.id)}
                className={cn(
                  'flex-1 flex flex-col items-center justify-center py-3 px-2 transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-text-primary'
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom padding for mobile navigation */}
      <div className="md:hidden h-16" />
    </div>
  );
}

