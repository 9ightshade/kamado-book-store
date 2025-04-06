import { fetchGenres } from '../../lib/api';
import GenreList from '../../components/GenreList';

export default async function Genres() {
  const genres = await fetchGenres();
  
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Genres</h1>
      <GenreList genres={genres} />
    </div>
  );
}