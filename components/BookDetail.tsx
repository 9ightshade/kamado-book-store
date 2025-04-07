"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { bookService } from "@/services/bookService";
import { useAuth } from "@/contexts/AuthContext";

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

export default function BookDetail ({ bookId }:BookDetailProps) {
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
    return (
      <div className="text-center py-8 text-2xl text-gray-800 transition-opacity duration-300 animate-pulse">
        Loading book details...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-8 text-red-600 transition-opacity duration-300 hover:opacity-80">
        {error}
      </div>
    );
  if (!book)
    return (
      <div className="text-center py-8 text-gray-600 transition-opacity duration-300 hover:opacity-80">
        Book not found
      </div>
    );

  const isOwner = user && user.$id === book.userId;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/books"
          className="text-blue-600 transition-all font-bold duration-300 hover:underline hover:text-blue-800"
        >
          ← Back to Books
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 transform transition-all duration-300 hover:-translate-y-2">
          {book.coverImageId ? (
            <Image
              width={300}
              height={300}
              src={
                bookService.getImagePreview(book.coverImageId) ||
                "/placeholder-image.png"
              }
              alt={`Cover for ${book.title}`}
              className="w-full h-full object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-gray-500 transition-opacity duration-300 hover:opacity-80">
              No cover image
            </div>
          )}
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-800 transition-transform duration-300 hover:scale-105">
            {book.title}
          </h1>
          <p className="text-xl text-gray-700 mt-2 transition-opacity duration-300 hover:opacity-80">
            by {book.author}
          </p>
          <div className="mt-2 inline-block px-3 py-1 bg-gray-200 text-gray-800 rounded-full text-sm transition-all duration-300 hover:bg-blue-200 hover:text-blue-800">
            {book.genre}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2 transition-colors duration-300 hover:text-blue-600">
              Description
            </h2>
            <p className="whitespace-pre-line text-gray-600 transition-opacity duration-300 hover:opacity-80">
              {book.description}
            </p>
          </div>

          {isOwner && (
            <div className="mt-8 flex space-x-4">
              <Link
                href={`/books/${book.$id}/edit`}
                className="px-4 py-2 bg-blue-600 text-white cursor-pointer rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95"
              >
                Edit Book
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-pink-300 text-gray-700 rounded-lg font-semibold transition-all duration-300 hover:bg-pink-200 cursor-pointer hover:shadow-lg hover:-translate-y-1 active:scale-95"
              >
                Delete Book
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
