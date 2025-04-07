import BookList from "@/components/BookList";

export default function Authors() {
  return (
    <div>
      <h1>List by Authors</h1>
      <p>Explore books categorized by authors.</p>
      <BookList authorOnly={true} />
    </div>
  );
}
