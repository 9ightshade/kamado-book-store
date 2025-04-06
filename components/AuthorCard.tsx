import { Author } from '@/types';

export function AuthorCard({ author }: { author: Author }) {
  return (
    <div className="p-4 border">
      <h2 className="text-xl">{author.name}</h2>
    </div>
  );
}
