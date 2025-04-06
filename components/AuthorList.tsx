'use client';
import { Author } from '../types';

export default function AuthorList({ authors }: { authors: Author[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {authors.map((author) => (
        <div key={author.id} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{author.name}</h2>
          {author.books && (
            <ul className="text-gray-600">
              {author.books.map((book) => (
                <li key={book.id}>{book.title}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}