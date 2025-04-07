# Kamado Bookstore

A modern, responsive web application for a bookstore built with Next.js that consumes a backend API. This application allows users to browse books, authors, and genres while performing CRUD operations with proper authentication.

![Bookstore Screenshot](https://cloud.appwrite.io/v1/storage/buckets/67f1cbc30018f823b0f4/files/67f4576c0018cf55dc6b/view?project=67f1af420034eb430b71)

## Live Demo

[View Live Demo](https://kamado-book-store.vercel.app/)

## Features

- **Book Management**
  - Browse a comprehensive list of books
  - View detailed information about each book
  - Search books by title, author, or genre
  - Add, edit and delete books (authenticated users)

- **Author Management**
  - Browse authors and their published works
  - View author details and bibliography
  - Add, edit and delete authors (authenticated users)

- **Genre Management**
  - Browse books by genre categories
  - View genre details with associated books
  - Add, edit and delete genres (authenticated users)

- **User Authentication**
  - Secure JWT-based authentication
  - User registration and login
  - Protected routes for authenticated users
  - User profile management

- **Responsive Design**
  - Mobile-first approach
  - Optimized for desktop, tablet, and mobile devices
  - Accessibility compliant

## Tech Stack

- **Frontend**
  - Next.js (React framework)
  - Tailwind CSS for styling
  - Appwrite for backend integration
  - React Hook Form for form handling
  - Appwrite for authentication

- **Backend**
  - Appwrite as a backend service
  - Storage for book cover images
  - Database for storing book, author, and genre information

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- Appwrite account and project setup

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/9ightshade/kamado-book-store.git
   cd kamado-book-store
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_APPWRITE_ENDPOINT=https://your-appwrite-endpoint
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=your-database-id
   NEXT_PUBLIC_APPWRITE_BOOKS_COLLECTION_ID=your-books-collection-id
   NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID=your-storage-bucket-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

```
kamado-book-store/
├── components/          # React components
│   ├── auth/            # Authentication components
│   ├── books/           # Book-related components
│   ├── authors/         # Author-related components
│   ├── genres/          # Genre-related components
│   ├── ui/              # UI components
│   └── layout/          # Layout components
├── lib/                 # Utility functions and libraries
│   └── appwrite.ts      # Appwrite configuration
├── services/            # API services
│   ├── bookService.ts   # Book-related API calls
│   ├── authService.ts   # Auth-related API calls
│     
├── pages/               # Next.js pages
│   ├── _app.tsx         # App component
│   ├── books/           # Book-related pages
│   ├── authors/         # Author-related pages
│   ├── genres/          # Genre-related pages
│   └── auth/            # Authentication pages
├── styles/              # Global styles
├── public/              # Static assets
└── README.md            # Project documentation
```

## API Integration

This project consumes a backend API built with Appwrite. The API provides endpoints for:

- User authentication (registration, login)
- CRUD operations for books
- CRUD operations for authors
- CRUD operations for genres
- Image upload for book covers

## Authentication Flow

1. User registers via the registration form
2. User logs in with email and password
3. API returns JWT token upon successful authentication
4. JWT token is stored in client-side storage
5. Protected routes check for valid JWT token
6. Logout clears the stored JWT token

## Deployment

The application is deployed on Vercel, which provides automatic deployments from the GitHub repository.

### Deploy on Vercel

1. Fork this repository
2. Create a new Vercel project
3. Connect the project to your GitHub repository
4. Set up the environment variables in the Vercel dashboard
5. Deploy

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Appwrite](https://appwrite.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/)