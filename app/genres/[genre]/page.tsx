"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Book, bookService } from "@/services/bookService";
import { BookCard } from "@/components/BookCard";
import { Models } from "appwrite";
import Link from "next/link";

export default function GenreSearchPage() {
  const router = useRouter();
  const params = useParams();
  const genreParam = params.genre as string;

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [books, setBooks] = useState<Models.Document[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [genre, setGenre] = useState<string>(
    genreParam ? decodeURIComponent(genreParam) : ""
  );

  // Popular genres - you may want to fetch these from your database
  const popularGenres = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Romance",
    "Thriller",
    "Biography",
    "History",
  ];

  const fetchBooksByGenre = async (genreValue: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await bookService.getBooksByGenre(genreValue);
      setBooks(results.documents);
    } catch (err) {
      console.error("Error fetching books by genre:", err);
      setError("Failed to fetch books. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch books when genre changes from URL
  useEffect(() => {
    if (genreParam) {
      const decodedGenre = decodeURIComponent(genreParam);
      setGenre(decodedGenre);
      fetchBooksByGenre(decodedGenre);
    }
  }, [genreParam]);

  const handleGenreClick = (selectedGenre: string) => {
    router.push(`/books/genre/${encodeURIComponent(selectedGenre)}`);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Books by Genre</h1>

      {/* Genre selector */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Popular Genres</h2>
        <div className="flex flex-wrap gap-2">
          {popularGenres.map((genreName) => (
            <button
              key={genreName}
              onClick={() => handleGenreClick(genreName)}
              className="mb-2">
              {genreName}
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Current genre display */}
      {genre && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">{genre}</h2>
          <p className="text-gray-600">
            {isLoading
              ? "Loading books..."
              : `${books.length} ${
                  books.length === 1 ? "book" : "books"
                } found`}
          </p>
        </div>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border p-4 h-48 bg-gray-100 animate-pulse rounded"></div>
          ))}
        </div>
      ) : books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book.$id} book={book as Book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-lg">
            No books found in the &quot;{genre}&quot; genre
          </p>
          <p className="text-gray-500 mt-2">
            Try selecting another genre or browse all books
          </p>
          <button className="mt-4" onClick={() => router.push("/books")}>
            Browse All Books
          </button>
        </div>
      )}

      {/* Back link */}
      <div className="mt-8">
        <Link href="/books">
          <button>← Back to All Books</button>
        </Link>
      </div>
    </div>
  );
}
