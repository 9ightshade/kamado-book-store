// app/books/page.tsx
import { fetchBookById, fetchBooks } from "@/lib/api";
import { Book } from "@/types";
import Link from "next/link";
import Image from "next/image";

export default async function BookListPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const query = searchParams?.q || "all";
  const books: Book[] = await fetchBooks(query);

  const bookById = await fetchBookById("OL24166W");
  console.log(bookById);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Books about &quot;{query}&quot;
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => {
          const id = book.key.split("/").pop();

          const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "/default-cover.jpg";
          const genres = book.subjects?.join(", ") || "No Genre";
          return (
            <Link
              key={book.key}
              href={`/books/${id}`}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow block">
              <Image
                src={coverUrl}
                alt={book.title}
                width={150}
                height={200}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold mb-1 text-black ">
                {book.title}
              </h2>
              <Link
                href={`/authors/${book.author_name}`}
                className="text-blue-500 hover:underline">
                {book.author_name?.join(", ") || "Unknown"}
              </Link>
              <p className="text-sm text-blue-600">Genres: {genres}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
