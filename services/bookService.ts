/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  databases,
  storage,
  ID_TYPE,
  QUERY_TYPE,
  appwriteConfig,
  DATABASES_ID,
  BOOKS_COLLECTION_ID,
  STORAGE_BUCKET_ID,
} from "@/lib/appwrite";
import { Models, ID, Query } from "appwrite";

// Book model interface
export interface Book extends Models.Document {
  title: string;
  author: string;
  description?: string;
  genre?: string;
  coverImageId?: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface BookFormData {
  title: string;
  author: string;
  description?: string;
  genre?: string;
  coverImage?: File | null;
}

interface CreateBookParams {
  title: string;
  author: string;
  description?: string;
  genre?: string;
  coverImage?: File | null;
  userId: string;
}

interface UpdateBookParams extends CreateBookParams {
  bookId: string;
}

export const bookService = {
  // Create a new book
  async createBook(
    title: string,
    author: string,
    genre: string,
    description: string,
    coverImageFile: File | null,
    userId: string
  ): Promise<Models.Document> {
    try {
      let coverImageId: string | null = null;

      if (coverImageFile) {
        const uploadResult = await storage.createFile(
          STORAGE_BUCKET_ID,
          ID.unique(),
          coverImageFile
        );
        coverImageId = uploadResult.$id;
      }

      const bookData = {
        title,
        author,
        genre,
        description,
        coverImageId,
        userId,
      };

      const result = await databases.createDocument(
        DATABASES_ID,
        BOOKS_COLLECTION_ID,
        ID.unique(),
        bookData
      );

      return result;
    } catch (error) {
      console.error("Error creating book:", error);
      throw error;
    }
  },

  // Get all books
  async getBooks(): Promise<Models.DocumentList<Models.Document>> {
    try {
      return await databases.listDocuments(DATABASES_ID, BOOKS_COLLECTION_ID);
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },

  // Get books by user ID
  async getBooksByUser(
    userId: string
  ): Promise<Models.DocumentList<Models.Document>> {
    try {
      return await databases.listDocuments(DATABASES_ID, BOOKS_COLLECTION_ID, [
        Query.equal("userId", userId),
      ]);
    } catch (error) {
      console.error("Error fetching user books:", error);
      throw error;
    }
  },

  //Get books by genre
  async getBooksByGenre(
    genre: string
  ): Promise<Models.DocumentList<Models.Document>> {
    try {
      // Case-insensitive search that works with partial matches
      const book = await databases.listDocuments(
        DATABASES_ID,
        BOOKS_COLLECTION_ID,
        [Query.search("genre", genre)]
      );
      console.log(book);
      return book;
    } catch (error) {
      console.error("Error fetching books by genre:", error);
      throw error;
    }
  },

  async searchBooks(
    searchTerm: string
  ): Promise<Models.DocumentList<Models.Document>> {
    try {
      // Search across title, author, and genre
      return await databases.listDocuments(DATABASES_ID, BOOKS_COLLECTION_ID, [
        Query.search("title", searchTerm),
        Query.search("author", searchTerm),
        Query.search("genre", searchTerm),
      ]);
    } catch (error) {
      console.error("Error searching books:", error);
      throw error;
    }
  },
  // Get books by author
  async getBooksByAuthor(
    author: string
  ): Promise<Models.DocumentList<Models.Document>> {
    try {
      // Case-insensitive search that works with partial matches
      const book = await databases.listDocuments(
        DATABASES_ID,
        BOOKS_COLLECTION_ID,
        [Query.search("author", author)]
      );
      console.log(book);
      return book;
    } catch (error) {
      console.error("Error fetching books by author:", error);
      throw error;
    }
  },

  //Get books by title
  async getBooksByTitle(
    title: string
  ): Promise<Models.DocumentList<Models.Document>> {
    try {
      // Case-insensitive search that works with partial matches
      const book = await databases.listDocuments(
        DATABASES_ID,
        BOOKS_COLLECTION_ID,
        [Query.search("title", title)]
      );
      console.log(book);
      return book;
    } catch (error) {
      console.error("Error fetching books by title:", error);
      throw error;
    }
  },

  // Get a single book by ID
  async getBook(bookId: string): Promise<Models.Document> {
    try {
      return await databases.getDocument(
        DATABASES_ID,
        BOOKS_COLLECTION_ID,
        bookId
      );
    } catch (error) {
      console.error("Error fetching book:", error);
      throw error;
    }
  },

  // Update a book
  async updateBook(
    bookId: string,
    bookData: Partial<Book>,
    newCoverImageFile: File | null = null
  ): Promise<Models.Document> {
    try {
      if (newCoverImageFile) {
        if (bookData.coverImageId) {
          try {
            await storage.deleteFile(STORAGE_BUCKET_ID, bookData.coverImageId);
          } catch (e) {
            console.log("Previous cover image not found or already deleted");
          }
        }

        const uploadResult = await storage.createFile(
          STORAGE_BUCKET_ID,
          ID.unique(),
          newCoverImageFile
        );
        bookData.coverImageId = uploadResult.$id;
      }

      return await databases.updateDocument(
        DATABASES_ID,
        BOOKS_COLLECTION_ID,
        bookId,
        bookData
      );
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  },

  // Delete a book
  async deleteBook(bookId: string): Promise<boolean> {
    try {
      const book = await this.getBook(bookId);

      await databases.deleteDocument(DATABASES_ID, BOOKS_COLLECTION_ID, bookId);

      if (book.coverImageId) {
        try {
          await storage.deleteFile(STORAGE_BUCKET_ID, book.coverImageId);
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
          console.log("Cover image not found or already deleted");
        }
      }

      return true;
    } catch (error) {
      console.error("Error deleting book:", error);
      throw error;
    }
  },

  // Get image preview URL
  getImagePreview(imageId: string | null): string | null {
    if (!imageId) return null;

    // Generate and return the actual URL string

    const resourceUrl = storage.getFileView(STORAGE_BUCKET_ID, imageId);
    console.log(resourceUrl);
    return resourceUrl;
  },
};
