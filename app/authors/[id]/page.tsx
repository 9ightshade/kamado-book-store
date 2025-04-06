// app/authors/[id]/page.tsx (AuthorDetailsPage)
import { fetchBooksByAuthor } from "@/lib/api";
import { Book } from "@/types";
import Image from "next/image";
import Link from "next/link";

export default async function AuthorDetailsPage({
  params,
}: {
  params: { id: string }; // Author's name (or ID) will be passed as a parameter
}) {
  const authorBooks: Book[] = await fetchBooksByAuthor(params.id);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Books by {params.id}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {authorBooks.map((book) => {
          const coverUrl = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
            : "/default-cover.jpg";

          return (
            <Link
              key={book.key}
              href={`/books/${book.key}`}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow block"
            >
              <Image
                src={coverUrl}
                alt={book.title}
                width={150}
                height={200}
                className="w-full h-48 object-cover mb-4 rounded"
              />
              <h2 className="text-lg font-semibold mb-1">{book.title}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
