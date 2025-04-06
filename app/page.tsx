import { fetchBooks } from "../lib/api";
import BookList from "../components/BookList";

export default async function Home() {
  const books = await fetchBooks();
  return (
    <div>
      <h1>Kamado Book Store</h1>
      <BookList books={books} />
    </div>
  );
}
