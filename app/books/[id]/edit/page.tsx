"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import BookForm from "@/components/BookForm";
import { useAuth } from "@/contexts/AuthContext";
import { bookService } from "@/services/bookService";
import { useCallback } from "react";

interface Book {
  $id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImageId: string | null;
  userId: string;
}

// interface EditBookPageProps {
//   params: {
//     id: string;
//   };
// }

export default function EditBookPage(): JSX.Element {
  const params = useParams();
  const id = params.id as string;
  const { user, loading } = useAuth();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [bookLoading, setBookLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchBook = useCallback(async (): Promise<void> => {
    try {
      setBookLoading(true);
      const documentData = await bookService.getBook(id);
      const bookData: Book = {
        $id: documentData.$id,
        title: documentData.title,
        author: documentData.author,
        genre: documentData.genre,
        description: documentData.description,
        coverImageId: documentData.coverImageId || null,
        userId: documentData.userId,
      };

      if (user && bookData.userId !== user.$id) {
        setError("You do not have permission to edit this book");
        return;
      }

      setBook(bookData);
    } catch (error) {
      console.error("Error fetching book:", error);
      setError("Failed to load book");
    } finally {
      setBookLoading(false);
    }
  }, [id, user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push(`/login?redirect=/books/${id}/edit`);
      return;
    }

    fetchBook();
  }, [id, user, loading, router, fetchBook]);

  if (loading || bookLoading)
    return <div className="text-center py-8">Loading...</div>;
  if (error)
    return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!user) return null;
  if (!book) return <div className="text-center py-8">Book not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <BookForm
        book={{ ...book, coverImageId: book.coverImageId ?? undefined }}
      />
    </div>
  );
}
