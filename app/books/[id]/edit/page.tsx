'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import BookForm from '@/components/BookForm';
import { useAuth } from '@/contexts/AuthContext';
import { bookService } from '@/services/bookService';

interface Book {
  $id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImageId: string | null;
  userId: string;
}

interface EditBookPageProps {
  params: {
    id: string;
  };
}

export default function EditBookPage({ params }: EditBookPageProps): JSX.Element {
  const { id } = params;
  const { user, loading } = useAuth();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [bookLoading, setBookLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/books/${id}/edit`);
      return;
    }

    fetchBook();
  }, [id, user, loading, router]);

  const fetchBook = async (): Promise<void> => {
    try {
      setBookLoading(true);
      const bookData: Book = await bookService.getBook(id);

      if (user && bookData.userId !== user.$id) {
        setError('You do not have permission to edit this book');
        return;
      }

      setBook(bookData);
    } catch (error) {
      console.error('Error fetching book:', error);
      setError('Failed to load book');
    } finally {
      setBookLoading(false);
    }
  };

  if (loading || bookLoading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!user) return null;
  if (!book) return <div className="text-center py-8">Book not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <BookForm book={book} />
    </div>
  );
}
