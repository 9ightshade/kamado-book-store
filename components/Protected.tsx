'use client';

import { useEffect, useState } from 'react';
import { getCurrentUser } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function Protected({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getCurrentUser().then(user => {
      if (!user) router.push('/login');
      else setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}
