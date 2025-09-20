'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { TextField } from '@/components/ui/TextField';
import { Card } from '@/components/ui/Card';
import { User } from '@/lib/types';
import { userApi } from '@/lib/services/api';

interface AuthViewProps {
  onAuthSuccess: (user: User) => void;
}

export function AuthView({ onAuthSuccess }: AuthViewProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    walletAddress: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.walletAddress.trim()) {
      newErrors.walletAddress = 'Wallet address is required';
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(formData.walletAddress)) {
      newErrors.walletAddress = 'Invalid wallet address format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      let user: User;

      if (isLogin) {
        // For login, try to find existing user or create new one
        const existingUsers = await userApi.getAll();
        const existingUser = existingUsers.find(
          u => u.username === formData.username && u.walletAddress === formData.walletAddress
        );

        if (existingUser) {
          user = existingUser;
        } else {
          // Create new user
          user = await userApi.create({
            userId: `user_${Date.now()}`,
            username: formData.username,
            walletAddress: formData.walletAddress,
          });
        }
      } else {
        // Create new user
        user = await userApi.create({
          userId: `user_${Date.now()}`,
          username: formData.username,
          walletAddress: formData.walletAddress,
        });
      }

      onAuthSuccess(user);
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({
        general: isLogin
          ? 'Login failed. Please check your credentials.'
          : 'Registration failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💃</span>
          </div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Welcome to GrooveSync
          </h1>
          <p className="text-text-secondary">
            {isLogin ? 'Sign in to start your dance journey' : 'Create your account to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.general && (
            <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          <TextField
            label="Username"
            value={formData.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
            error={errors.username}
            placeholder="Enter your username"
            fullWidth
          />

          <TextField
            label="Wallet Address"
            value={formData.walletAddress}
            onChange={(e) => handleInputChange('walletAddress', e.target.value)}
            error={errors.walletAddress}
            placeholder="0x..."
            fullWidth
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading}
            loading={isLoading}
            className="w-full"
          >
            {isLoading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
              setFormData({ username: '', walletAddress: '' });
            }}
            className="text-primary hover:text-primary/80 text-sm transition-colors"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"
            }
          </button>
        </div>

        <div className="mt-8 p-4 bg-surface rounded-md">
          <h3 className="text-sm font-medium text-text-primary mb-2">
            Demo Credentials
          </h3>
          <p className="text-xs text-text-secondary">
            Username: demo_user<br />
            Wallet: 0x742d35Cc6634C0532925a3b844Bc454e4438f44e
          </p>
        </div>
      </Card>
    </div>
  );
}

