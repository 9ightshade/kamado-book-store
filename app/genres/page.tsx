"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Book, bookService } from "@/services/bookService";
import { BookCard } from "@/components/BookCard";
import { Models } from "appwrite";

export default function BookGenreSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genreParam = searchParams.get("genre");
  
  // // Available genres
  // const genres = [
  //   "Fiction",
  //   "Fantasy",
  //   "Sci-Fi",
  //   "Mystery",
  //   "Thriller",
  //   "Romance",
  //   "Horror",
  //   "Science",
  //   "History",
  //   "Non-fiction",
  //   "Biography",
  //   "Young Adult",
  //   "Children's",
  //   "Poetry",
  //   "Drama",
  //   "Other"
  // ];
  
  const [selectedGenre, setSelectedGenre] = useState<string>(genreParam || "");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [books, setBooks] = useState<Models.Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!selectedGenre) {
        setError("Please select a genre");
        return;
      }
      
      setIsSearching(true);
      setError(null);
      
      try {
        const results = await bookService.getBooksByGenre(selectedGenre);
        console.log(results);
        
        setBooks(results.documents);
        // Update URL with genre query
        const params = new URLSearchParams();
        params.set("genre", selectedGenre);
        router.push(`/books/genre?${params.toString()}`);
      } catch (err) {
        console.error("Error searching books by genre:", err);
        setError("Failed to search books. Please try again.");
      } finally {
        setIsSearching(false);
      }
    },
    [selectedGenre, router]
  );

  // Handle initial search from URL query
  useEffect(() => {
    if (genreParam) {
      handleSearch();
    }
  }, [genreParam, handleSearch]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">
        Browse Books by Genre
      </h1>
      
      <form
        onSubmit={handleSearch}
        className="mb-8 mx-auto max-w-[70%] py-3 px-3 flex gap-2 bg-gray-800 rounded-2xl">
        <input
          type="text"
          placeholder="Search by genre..."
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="w-full p-2 rounded-xl outline-none"
        />
        <button
          type="submit"
          disabled={isSearching}
          className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition duration-200 cursor-pointer">
          {isSearching ? "Searching..." : "Search"}
        </button>
      </form>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {books.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Found {books.length} {books.length === 1 ? "book" : "books"} in genre &quot;{selectedGenre}&quot;
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.$id}
                book={{ ...book, genre: book?.genre || "Unknown" } as Book}
              />
            ))}
          </div>
        </div>
      ) : (
        selectedGenre &&
        !isSearching && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-700">
              No books found in genre &quot;{selectedGenre}&quot;
            </p>
            <p className="text-gray-700 mt-2">
              Try another genre or browse all books
            </p>
            <button
              className="mt-4 text-blue-500 cursor-pointer hover:underline"
              onClick={() => router.push("/books")}>
              Browse All Books
            </button>
          </div>
        )
      )}
    </div>
  );
}