"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { bookService } from "@/services/bookService";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
interface Book {
  $id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImageId?: string;
  userId: string;
}

interface BookDetailProps {
  bookId: string;
}

export default function BookDetail({ bookId }: BookDetailProps) {
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    fetchBook();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const document = await bookService.getBook(bookId);
      const bookData: Book = {
        $id: document.$id,
        title: document.title,
        author: document.author,
        genre: document.genre,
        description: document.description,
        coverImageId: document.coverImageId,
        userId: document.userId,
      };
      setBook(bookData);
    } catch (error) {
      console.error("Error fetching book:", error);
      setError("Failed to load book details");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await bookService.deleteBook(bookId);
      router.push("/books");
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book");
    }
  };

  if (loading)
    return <div className="text-center py-8">Loading book details...</div>;
  if (error)
    return <div className="text-center py-8 text-red-600">{error}</div>;
  if (!book) return <div className="text-center py-8">Book not found</div>;

  const isOwner = user && user.$id === book.userId;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/books" className="text-blue-600 hover:underline">
          &larr; Back to Books
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          {book.coverImageId ? (
            <Image
              src={
                bookService.getImagePreview(book.coverImageId) ||
                "/placeholder-image.png"
              }
              alt={`Cover for ${book.title}`}
              className="w-full rounded-lg shadow-md"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              No cover image
            </div>
          )}
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-xl text-gray-700 mt-2">by {book.author}</p>
          <div className="mt-2 inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm">
            {book.genre}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="whitespace-pre-line">{book.description}</p>
          </div>

          {isOwner && (
            <div className="mt-8 flex space-x-4">
              <Link
                href={`/books/${book.$id}/edit`}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Edit Book
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Delete Book
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
