"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

interface BookListProps {
  userOnly?: boolean;
  genreOnly?: boolean;
  authorOnly?: boolean;
}

export default function BookList ({
  userOnly = false,
  genreOnly = false,
  authorOnly = false,
}:BookListProps)  {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { user } = useAuth();

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userOnly, user, genreOnly, authorOnly]);

  const fetchBooks = async () => {
    if (userOnly && !user) {
      setBooks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      let booksData: Book[] = (await bookService.getBooks()).documents.map(
        (doc) => ({
          $id: doc.$id,
          title: doc.title,
          author: doc.author,
          genre: doc.genre,
          description: doc.description,
          coverImageId: doc.coverImageId,
          userId: doc.userId,
        })
      );

      if (userOnly) {
        booksData = (
          await bookService.getBooksByUser(user?.$id || "")
        ).documents.map((doc) => ({
          $id: doc.$id,
          title: doc.title,
          author: doc.author,
          genre: doc.genre,
          description: doc.description,
          coverImageId: doc.coverImageId,
          userId: doc.userId,
        }));
      }

      if (genreOnly) {
        booksData = (
          await bookService.getBooksByGenre(user?.$id || "")
        ).documents.map((doc) => ({
          $id: doc.$id,
          title: doc.title,
          author: doc.author,
          genre: doc.genre,
          description: doc.description,
          coverImageId: doc.coverImageId,
          userId: doc.userId,
        }));
      }

      if (authorOnly) {
        booksData = (
          await bookService.getBooksByAuthor(user?.$id || "")
        ).documents.map((doc) => ({
          $id: doc.$id,
          title: doc.title,
          author: doc.author,
          genre: doc.genre,
          description: doc.description,
          coverImageId: doc.coverImageId,
          userId: doc.userId,
        }));
      }

      setBooks(booksData);
      console.log(booksData);
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

  if (loading)
    return (
      <div className="text-center py-8 text-2xl text-gray-800 transition-opacity duration-300 animate-pulse">
        Loading books...
      </div>
    );
  if (error)
    return (
      <div className="text-center py-8 text-red-600 transition-opacity duration-300 hover:opacity-80">
        {error}
      </div>
    );
  if (books.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="mb-4 text-gray-600 transition-opacity duration-300 hover:opacity-80">
          No books found.
        </p>
        {user && (
          <Link
            href="/books/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95"
          >
            Add a New Book
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-300 transition-transform duration-300 hover:scale-105">
          {userOnly ? "My Books" : "All Books"}
        </h1>
        {user && (
          <Link
            href="/books/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-2xl font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95"
          >
            Add a New Book
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.$id}
            className="border rounded-lg overflow-hidden shadow-md bg-white transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="h-48 bg-gray-200 relative">
              {book.coverImageId ? (
                <Image
                  width={150}
                  height={150}
                  src={
                    bookService.getImagePreview(book.coverImageId) ||
                    "/default-cover.jpg"
                  }
                  alt={`Cover for ${book.title}`}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500 transition-opacity duration-300 hover:opacity-80">
                  No cover image
                </div>
              )}
            </div>

            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 transition-colors duration-300 hover:text-blue-600">
                {book.title}
              </h2>
              <p className="text-gray-700 transition-opacity duration-300 hover:opacity-80">
                {book.author}
              </p>
              <p className="text-sm text-gray-500 mt-1 transition-opacity duration-300 hover:opacity-80">
                {book.genre}
              </p>
              <p className="text-sm mt-2 line-clamp-2 text-gray-600 transition-opacity duration-300 hover:opacity-80">
                {book.description}
              </p>

              <div className="mt-4 flex justify-between items-center">
                <Link
                  href={`/books/${book.$id}`}
                  className="text-blue-600 font-medium transition-all duration-300 hover:underline hover:text-blue-800"
                >
                  View Details
                </Link>

                {user && user.$id === book.userId && (
                  <div className="space-x-2">
                    <Link
                      href={`/books/${book.$id}/edit`}
                      className="text-blue-600 font-medium transition-all duration-300 hover:underline hover:text-blue-800"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book.$id)}
                      className="bg-blue-600 px-4 rounded-2xl py-1 cursor-pointer font-medium transition-all duration-300"
                    >
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
};
