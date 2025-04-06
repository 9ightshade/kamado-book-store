'use client';
import { Book } from '../types';

export default function BookDetails({ book }: { book: Book }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-gray-700 mb-2">Author: {book.author.name}</p>
      <p className="text-gray-700 mb-2">Genre: {book.genre.name}</p>
      <p className="text-gray-600 mt-4">{book.description}</p>
    </div>
  );
}