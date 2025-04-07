export interface Book {
  $id: string;
  title: string;
  author: string; // could be author ID
  genre: string; // could be genre ID
  description: string;
}

export interface Author {
  $id: string;
  name: string;
  books: string[]; // book IDs
}

export interface Genre {
  $id: string;
  name: string;
  books: string[];
}
