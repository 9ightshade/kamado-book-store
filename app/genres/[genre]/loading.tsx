export default function Loading() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Books by Genre</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Popular Genres</h2>
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-10 bg-gray-200 animate-pulse rounded w-24 mb-2"></div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <div className="h-8 bg-gray-200 animate-pulse rounded w-32 mb-2"></div>
        <div className="h-5 bg-gray-200 animate-pulse rounded w-24"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border p-4 h-48 bg-gray-100 animate-pulse rounded"></div>
        ))}
      </div>
    </div>
  );
}
