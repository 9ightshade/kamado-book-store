// app/authors/page.tsx
import { fetchAuthors } from "@/lib/api";
import { Author } from "@/types";
import Link from "next/link";

export default async function AuthorListPage() {
  const authors: Author[] = await fetchAuthors();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Authors</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {authors.map((author) => (
          <div key={author.key} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
            <p className="text-gray-600 mb-2">Books by {author.name}:</p>
            <ul className="list-disc pl-5">
              {author.books?.slice(0, 5).map((book, index) => (
                <li key={index}>
                  <Link href={`/books/${book.key}`} className="text-blue-500 hover:underline">
                    {book.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
