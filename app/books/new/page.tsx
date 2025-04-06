"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import BookForm from "@/components/BookForm";
import { useAuth } from "@/contexts/AuthContext";

export default function NewBookPage(): JSX.Element | null {
  const { user, loading }: { user: { $id: string } | null; loading: boolean } =
    useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/books/new");
    }
  }, [user, loading, router]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto">
      <BookForm />
    </div>
  );
}
