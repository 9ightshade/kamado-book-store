export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  covers?: number[];
  first_publish_year?: number;
  subjects: string[];
}

export interface Author {
  name: string;
  bio?: string | { value: string };
  birth_date?: string;
  death_date?: string;
}

export interface Genre {
  id: string;
  name: string;
  books?: Book[];
}

export interface BookDetails {
  title: string;
  description?: { value: string };
  subjects?: string[];
  authors?: { name: string }[];
  cover_i?: number;
}
