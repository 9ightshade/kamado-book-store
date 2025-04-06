"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

interface BookListProps {
  userOnly?: boolean;
}

export default function BookList({ userOnly = false }: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userOnly, user]);

  const fetchBooks = async () => {
    if (userOnly && !user) {
      setBooks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const booksData: Book[] = userOnly
        ? (await bookService.getBooksByUser(user?.$id || "")).documents.map(
            (doc) => ({
              $id: doc.$id,
              title: doc.title,
              author: doc.author,
              genre: doc.genre,
              description: doc.description,
              coverImageId: doc.coverImageId,
              userId: doc.userId,
            })
          )
        : (await bookService.getBooks()).documents.map((doc) => ({
            $id: doc.$id,
            title: doc.title,
            author: doc.author,
            genre: doc.genre,
            description: doc.description,
            coverImageId: doc.coverImageId,
            userId: doc.userId,
          }));
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookId: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await bookService.deleteBook(bookId);
      setBooks((prevBooks) => prevBooks.filter((book) => book.$id !== bookId));
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book");
    }
  };

  if (loading) return <div className="text-center py-8">Loading books...</div>;
  if (error)
    return <div className="text-center py-8 text-red-600">{error}</div>;
  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="mb-4">No books found.</p>
        {user && (
          <Link
            href="/books/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add a New Book
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {userOnly ? "My Books" : "All Books"}
        </h1>
        {user && (
          <Link
            href="/books/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Add a New Book
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.$id}
            className="border rounded-lg overflow-hidden shadow-md">
            <div className="h-48 bg-gray-200">
              {book.coverImageId ? (
                <Image
                  width={150}
                  height={150}
                  src={
                    bookService.getImagePreview(book.coverImageId) ||
                    "/default-cover.jpg"
                  }
                  alt={`Cover for ${book.title}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  No cover image
                </div>
              )}
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold">{book.title}</h2>
              <p className="text-gray-700">{book.author}</p>
              <p className="text-sm text-gray-500 mt-1">{book.genre}</p>
              <p className="text-sm mt-2 line-clamp-2">{book.description}</p>

              <div className="mt-4 flex justify-between">
                <Link
                  href={`/books/${book.$id}`}
                  className="text-blue-600 hover:underline">
                  View Details
                </Link>

                {user && user.$id === book.userId && (
                  <div className="space-x-2">
                    <Link
                      href={`/books/${book.$id}/edit`}
                      className="text-green-600 hover:underline">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book.$id)}
                      className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
