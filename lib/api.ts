// lib/api.ts or utils/api.ts
import axios from "axios";
import { Book, BookDetails, Author } from "../types";

const API_URL = "https://openlibrary.org";

// Search for books by query (e.g., title, subject, author, etc.)
export const fetchBooks = async (query: string): Promise<Book[]> => {
  const response = await axios.get(
    `${API_URL}/search.json?q=${encodeURIComponent(query)}`
  );
  return response.data.docs.slice(0, 20); // limit to top 20 results
};

// Fetch book details by ID (based on the book's work ID)
export const fetchBookById = async (id: string): Promise<BookDetails> => {
  const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
  return res.data;
};

// Get author details by Author ID (e.g., OL23919A)
export const fetchAuthorById = async (id: string): Promise<Author> => {
  const response = await axios.get(`${API_URL}/authors/${id}.json`);
  return response.data;
};

// Fetch books by a specific author (name or id)
export const fetchBooksByAuthor = async (author: string): Promise<Book[]> => {
  const res = await axios.get(
    `https://openlibrary.org/search.json?author=${author}`
  );
  return res.data.docs;
};
