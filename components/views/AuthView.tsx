'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface AuthViewProps {
  onAuth: () => void;
}

export function AuthView({ onAuth }: AuthViewProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection delay
    setTimeout(() => {
      onAuth();
      setIsConnecting(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and branding */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-4 mx-auto dance-glow">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">GrooveSync</h1>
          <p className="text-text-secondary text-lg">Sync your moves, share your dance</p>
        </div>

        {/* Features preview */}
        <Card className="p-6 mb-6">
          <h2 className="text-xl font-semibold text-text-primary mb-4">What you can do:</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary text-sm">📚</span>
              </div>
              <span className="text-text-secondary">Access dance tutorials</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-accent text-sm">🤖</span>
              </div>
              <span className="text-text-secondary">Get AI practice feedback</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                <span className="text-primary text-sm">👥</span>
              </div>
              <span className="text-text-secondary">Practice with partners</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                <span className="text-accent text-sm">🏆</span>
              </div>
              <span className="text-text-secondary">Join dance challenges</span>
            </div>
          </div>
        </Card>

        {/* Auth button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleConnect}
          loading={isConnecting}
          className="w-full gradient-bg text-white font-semibold"
        >
          {isConnecting ? 'Connecting...' : 'Connect with Farcaster'}
        </Button>

        <p className="text-center text-text-secondary text-sm mt-4">
          Connect your Farcaster account to start dancing with the community
        </p>
      </div>
    </div>
  );
}
