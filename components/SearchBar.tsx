// components/SearchBar.tsx
'use client'
import { useState } from 'react';
export default function SearchBar() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:border-blue-500"
        placeholder="Search books..."
      />
    </div>
  );
}
