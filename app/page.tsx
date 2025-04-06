// import Image from "next/image";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Book Store</h1>
      <p className="text-xl mb-8">
        Discover and manage your favorite books in one place.
      </p>
      <div className="flex justify-center space-x-4">
        <a href="/books" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Browse Books
        </a>
        <a href="/login" className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50">
          Sign In
        </a>
      </div>
    </div>
  );
}
