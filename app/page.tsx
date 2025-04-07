import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 transition-transform duration-300 hover:scale-105">
        Welcome to Kamado Book Store Collections
      </h1>
      <p className="text-xl text-gray-600 mb-8 transition-opacity duration-300 hover:opacity-80">
        Discover and manage your favorite books in one place.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          href="/books"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95">
          Browse Books
        </Link>
        <Link
          href="/login"
          className="px-8 py-3 border border-blue-600 text-blue-600 rounded-2xl font-semibold transition-all duration-300  hover:shadow-md hover:-translate-y-1 active:scale-95">
          Sign In
        </Link>
      </div>
      <div className="mt-8">
        <Link
          href="/books/search"
          className="px-6 py-3 text-blue-600 text-2xl rounded-lg hover:underline font-semibold transition-all duration-300 hover:text-blue-800 hover:shadow-md hover:-translate-y-1">
          Search Our Collections
        </Link>
      </div>
    </div>
  );
}
