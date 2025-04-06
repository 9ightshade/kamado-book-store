import { Genre } from '@/types';

export function GenreCard({ genre }: { genre: Genre }) {
  return (
    <div className="p-4 border">
      <h2 className="text-xl">{genre.name}</h2>
    </div>
  );
}
