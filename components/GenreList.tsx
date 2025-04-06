'use client';
import { Genre } from '../types';

export default function GenreList({ genres }: { genres: Genre[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {genres.map((genre) => (
        <div key={genre.id} className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">{genre.name}</h2>
          {genre.books && (
            <ul className="text-gray-600">
              {genre.books.map((book) => (
                <li key={book.id}>{book.title}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}