"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { bookService } from "@/services/bookService";
import { useAuth } from "@/contexts/AuthContext";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Models } from "appwrite";
import Image from "next/image";

interface BookFormProps {
  book?: {
    $id: string;
    title?: string;
    author?: string;
    genre?: string;
    description?: string;
    coverImageId?: string;
  };
}

interface FormData {
  title: string;
  author: string;
  genre: string;
  description: string;
}

export default function BookForm({ book }: BookFormProps) {
  const isEditMode = !!book;
  const router = useRouter();
  const { user } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    genre: "",
    description: "",
  });

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        description: book.description || "",
      });

      if (book.coverImageId) {
        setPreviewUrl(bookService.getImagePreview(book.coverImageId) || "");
      }
    }
  }, [book]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in to perform this action");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      if (isEditMode && book) {
        await bookService.updateBook(
          book.$id,
          {
            ...formData,
            coverImageId: book.coverImageId,
            userId: user.$id,
          },
          coverImage
        );
      } else {
        await bookService.createBook(
          formData.title,
          formData.author,
          formData.genre,
          formData.description,
          coverImage,
          user.$id
        );
      }

      router.push("/books");
      router.refresh();
    } catch (error) {
      console.error("Error submitting book:", error);
      setError("Failed to save book. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">
        {isEditMode ? "Edit Book" : "Add New Book"}
      </h1>

      {error && (
        <div className="bg-red-100 p-3 rounded text-red-700">{error}</div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"
        />
      </div>

      <div>
        <label htmlFor="genre" className="block text-sm font-medium">
          Genre
        </label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2">
          <option value="">Select a genre</option>
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Mystery">Mystery</option>
          <option value="Thriller">Thriller</option>
          <option value="Romance">Romance</option>
          <option value="Biography">Biography</option>
          <option value="History">History</option>
          <option value="Science">Science</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2"></textarea>
      </div>

      <div>
        <label htmlFor="coverImage" className="block text-sm font-medium">
          Book Cover
        </label>
        <input
          type="file"
          id="coverImage"
          accept="image/*"
          onChange={handleImageChange}
          className="mt-1 block w-full"
        />
        {previewUrl && (
          <div className="mt-2">
            <Image
              width={150}
              height={150}
              src={previewUrl}
              alt="Cover preview"
              className="h-40 object-contain"
            />
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-md shadow-sm">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 disabled:opacity-50">
          {isSubmitting ? "Saving..." : isEditMode ? "Update Book" : "Add Book"}
        </button>
      </div>
    </form>
  );
}
