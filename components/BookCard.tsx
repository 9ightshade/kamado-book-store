import { Book } from '@/types';

export function BookCard({ book }: { book: Book }) {
  return (
    <div className="p-4 border">
      <h2 className="text-xl">{book.title}</h2>
      <p>{book.description}</p>
      <p><strong>Author:</strong> {book.authorId}</p>
      <p><strong>Genre:</strong> {book.genreId}</p>
    </div>
  );
}
