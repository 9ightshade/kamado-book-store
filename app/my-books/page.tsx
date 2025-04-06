'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookList from '@/components/BookList';
import { useAuth } from '@/contexts/AuthContext';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface User {
  $id: string;
  [key: string]: unknown;
}

export default function MyBooksPage(): JSX.Element {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login?redirect=/my-books');
    }
  }, [user, loading, router]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto">
      <BookList userOnly={true} />
    </div>
  );
}
