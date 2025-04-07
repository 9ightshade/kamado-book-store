// BookSearchPage.tsx
"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Book, bookService } from "@/services/bookService";
import { BookCard } from "@/components/BookCard";
import { Models } from "appwrite";

export default function BookSearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const typeParam = searchParams.get("type") || "title"; // Default search type

  const [searchTerm, setSearchTerm] = useState<string>(queryParam);
  const [searchType, setSearchType] = useState<string>(typeParam);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [books, setBooks] = useState<Models.Document[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(
    async (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!searchTerm.trim()) {
        setError("Please enter a search term");
        return;
      }

      setIsSearching(true);
      setError(null);

      try {
        let results: Models.DocumentList<Models.Document>;

        // Perform the appropriate search based on type
        switch (searchType) {
          case "author":
            results = await bookService.getBooksByAuthor(searchTerm);
            break;
          case "genre":
            results = await bookService.getBooksByGenre(searchTerm);
            break;
          case "title":
          default:
            results = await bookService.getBooksByTitle(searchTerm);
            break;
        }

        setBooks(results.documents);

        // Update URL with search query and type
        const params = new URLSearchParams();
        params.set("query", searchTerm);
        params.set("type", searchType);
        router.push(`/books/search?${params.toString()}`);
      } catch (err) {
        console.error(`Error searching books by ${searchType}:`, err);
        setError(`Failed to search books by ${searchType}. Please try again.`);
      } finally {
        setIsSearching(false);
      }
    },
    [searchTerm, searchType, router]
  );

  // Handle initial search from URL query
  useEffect(() => {
    if (queryParam) {
      handleSearch();
    }
  }, [queryParam, handleSearch]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-700">
        Search Books by title, author and genre
      </h1>

      <form
        onSubmit={handleSearch}
        className="mb-8 mx-auto max-w-[70%] py-3 px-3 flex flex-col gap-2  rounded-2xl">
        <div className="flex flex-row gap-2 bg-gray-700 rounded-full ">
          <input
            type="text"
            placeholder="Search books by title, author and genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-xl outline-none px-3"
          />

          <button
            type="submit"
            disabled={isSearching}
            className="bg-blue-600 text-white px-4 py-2 rounded-2xl hover:bg-blue-700 transition duration-200 cursor-pointer">
            {isSearching ? "Searching HQ..." : "Search"}
          </button>
        </div>

        <div className="flex justify-center gap-4 text-white py-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="searchType"
              value="title"
              checked={searchType === "title"}
              onChange={() => setSearchType("title")}
              className="mr-1"
            />
            Title
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="searchType"
              value="author"
              checked={searchType === "author"}
              onChange={() => setSearchType("author")}
              className="mr-1"
            />
            Author
          </label>

          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="searchType"
              value="genre"
              checked={searchType === "genre"}
              onChange={() => setSearchType("genre")}
              className="mr-1"
            />
            Genre
          </label>
        </div>
      </form>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {books.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Found {books.length} {books.length === 1 ? "book" : "books"} with{" "}
            {searchType}: &quot;{searchTerm}&quot;
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
        searchTerm &&
        !isSearching && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-700">
              No books found with {searchType}: &quot;{searchTerm}&quot;
            </p>
            <p className="text-gray-700 mt-2">
              Try another search term or browse all books
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
