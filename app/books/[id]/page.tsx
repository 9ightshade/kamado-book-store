// app/books/[id]/page.tsx (BookDetailsPage)
import { fetchBookById } from "@/lib/api";
import { BookDetails } from "@/types";
import Image from "next/image";

export default async function BookDetailsPage({
  params,
}: {
  params: { id: string }; // The dynamic ID for the book
}) {
  const book: BookDetails = await fetchBookById(params.id);

  console.log(book);

  const genres = book.subjects?.slice(0, 3).join(", ") || "No Genre";

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>

      {/* Book cover */}
      <Image
        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
        alt={book.title}
        className="w-full h-auto object-cover mb-4 rounded"
        width={50}
        height={50}
      />

      <p className="text-lg font-semibold mb-2">Description:</p>
      <p className="mb-6">
        {book.description?.value || "No description available"}
      </p>



      <p className="font-semibold">Genre: {genres}:</p>
      {/* <p className="font-semibold mt-4">Authors:</p>
      <ul>
        {book.authors?.map((author, index) => (
          <li key={index} className="text-blue-800">
            {author.name}
          </li>
        ))}
      </ul> */}
    </div>
  );
}
