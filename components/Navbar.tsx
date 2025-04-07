"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    return pathname.startsWith(path)
      ? "font-bold text-blue-600"
      : "text-gray-600";
  };

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  const navItems = [
    { name: "Home", path: "/", auth: false },
    { name: "Books", path: "/books", auth: false },
    { name: "My Books", path: "/my-books", auth: true },
  ];

  const renderNavLinks = () => {
    return navItems.map((item) => {
      if (item.auth && !user) return null;

      return (
        <li key={item.path}>
          <Link
            href={item.path}
            className={`px-3 py-2 ${isActive(
              item.path
            )} transition-all duration-300 hover:text-blue-500 hover:scale-105`}>
            {item.name}
          </Link>
        </li>
      );
    });
  };

  return (
    <nav className=" shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-400 transition-all duration-300 hover:text-gray-100 hover:scale-105">
              Kamado Books Collection
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex">
            <ul className="flex items-center space-x-4">
              {renderNavLinks()}

              {!loading && (
                <>
                  {user ? (
                    <li className="flex items-center space-x-2">
                      <span className="px-3 py-2 text-gray-800 font-semibold transition-opacity duration-300 hover:opacity-80">
                        Hashira, {user.name || user.email}
                      </span>
                      <button
                        onClick={handleLogout}
                        className="px-3 py-2 border border-blue-600 text-blue-600 rounded-2xl cursor-pointer font-semibold transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-md hover:-translate-y-1 active:scale-95">
                        Sign Out
                      </button>
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link
                          href="/login"
                          className={`px-3 py-2 ${isActive(
                            "/login"
                          )} transition-all duration-300 hover:text-blue-500 hover:scale-105`}>
                          Sign In
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/register"
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:-translate-y-1 active:scale-95">
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className="text-gray-600 transition-all duration-300 hover:text-blue-500 hover:scale-110 focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu with animation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-screen" : "max-h-0"
        }`}>
        <ul className="px-2 pt-2 pb-3 space-y-1 ">
          {renderNavLinks()}

          {!loading && (
            <>
              {user ? (
                <>
                  <li className="px-3 py-2 text-gray-600 transition-opacity duration-300 hover:opacity-80">
                    Hello, {user.name || user.email}
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-blue-600 font-semibold transition-all duration-300 hover:bg-blue-50 hover:text-blue-800">
                      Sign Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className={`block px-3 py-2 ${isActive(
                        "/login"
                      )} transition-all duration-300 hover:bg-blue-50 hover:text-blue-500`}>
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/register"
                      className="block px-3 py-2 text-blue-600 font-semibold transition-all duration-300 hover:bg-blue-50 hover:text-blue-800">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
