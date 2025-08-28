'use client';

import { authClient } from '@/lib/auth-client';
import { useCallback, useEffect, useState } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
}

interface Session {
  user: User;
}

interface UserSessionReturn {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const useSession = (): UserSessionReturn => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getSession = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: sessionData } = await authClient.getSession();
      setSession(sessionData);
      
    } catch (error) {
      // setError(error);
      console.error('Session fetch error:', error);
    } finally {
      setLoading(false);
    }
  },[]);

  useEffect(() => {
    getSession();
  }, [getSession]);

  return {
    session,
    user: session?.user || null,
    loading,
    error,
    refetch: getSession,
  };
};

export default useSession;
