'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="p-8 text-center max-w-md w-full">
        <div className="text-6xl mb-4">😵</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Oops! Something went wrong
        </h2>
        <p className="text-text-secondary mb-6">
          Don't worry, even the best dancers stumble sometimes. Let's get you back on track!
        </p>
        <div className="space-y-3">
          <Button
            variant="primary"
            size="lg"
            onClick={reset}
            className="w-full"
          >
            Try Again
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/'}
            className="w-full"
          >
            Go Home
          </Button>
        </div>
        {error.digest && (
          <p className="text-xs text-text-secondary mt-4">
            Error ID: {error.digest}
          </p>
        )}
      </Card>
    </div>
  );
}
