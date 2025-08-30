'use client';

import useSession from '@/hooks/useSession';

const GetSession = () => {
  const { user, loading, error } = useSession();

  if (loading) return <div>Loading session...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>Not authenticated</div>;

  return (
    <div className="w-54">
      <p className="border text-center hover:bg-zinc-800 transition-colors rounded-xl py-4">
        {user.email}
      </p>
    </div>
  );
};

export default GetSession;
