"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterPage ()  {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { register, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/books");
    }
  }, [user, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await register(
        formData.email,
        formData.password,
        formData.name
      );
      if (!success) {
        setError("Registration failed. Email may already be in use.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6 transition-transform duration-300 hover:scale-105">
        Create Your Hashira Account
      </h1>

      {error && (
        <div className="bg-red-100 p-3 rounded-lg text-red-700 mb-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="transform transition-all duration-300 hover:-translate-y-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-xl border border-gray-300 p-3 shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-lg"
            placeholder="Your Name"
          />
        </div>

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
            className="mt-1 block w-full rounded-xl border border-gray-300 p-3 shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-lg"
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
            className="mt-1 block w-full rounded-xl border border-gray-300 p-3 shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-lg"
            placeholder="Your Password"
          />
          <p className="text-sm text-gray-600 mt-1 transition-opacity duration-300 hover:opacity-80">
            Must be at least 8 characters long
          </p>
        </div>

        <div className="transform transition-all duration-300 hover:-translate-y-1">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-blue-600"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-xl border border-gray-300 p-3 shadow-md outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-lg"
            placeholder="Confirm Your Password"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer "
          >
            {isSubmitting ? "Creating hashira account..." : "Register"}
          </button>
        </div>
      </form>

      <p className="mt-6 text-center text-gray-600 transition-all duration-300 hover:text-blue-600 hover:pl-2">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-600 font-medium transition-all duration-300 hover:underline hover:text-blue-800"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};