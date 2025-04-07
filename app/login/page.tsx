"use client";

import { useState, useEffect, ChangeEvent, FormEvent, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface FormData {
  email: string;
  password: string;
}

function LoginForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/books";

  useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const success = await login(formData.email, formData.password);
      if (!success) {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6 transition-transform duration-300 hover:scale-105">
        Sign In
      </h1>

      {error && (
        <div className="bg-red-100 p-3 rounded-lg text-red-700 mb-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="transform transition-all duration-300 hover:-translate-y-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full outline-none rounded-xl border border-gray-300 p-3 shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-lg"
            placeholder="Your Email"
          />
        </div>

        <div className="transform transition-all duration-300 hover:-translate-y-1">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-1 block w-full outline-none rounded-xl border border-gray-300 p-3 shadow-md focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-lg"
            placeholder="Your Password"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 text-white cursor-pointer font-semibold rounded-xl shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-gray-400 hover:text-white transition-all duration-300  hover:pl-2">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="text-blue-600 font-medium transition-all duration-300 hover:underline hover:text-blue-800"
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage(): JSX.Element {
  return (
    <Suspense fallback={<div className="max-w-md mx-auto mt-10 text-center text-gray-800 text-2xl animate-pulse">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}