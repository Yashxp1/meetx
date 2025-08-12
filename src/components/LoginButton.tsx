'use client';

import { authClient } from '@/lib/auth-client';
import { Button } from './ui/button';

export function LoginButton() {
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/home',
    });
  };

  return (
    <Button onClick={handleGoogleLogin} variant="outline">
      Sign in with Google
    </Button>
  );
}
