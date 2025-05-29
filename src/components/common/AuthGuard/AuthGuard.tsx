"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/api/auth";
import Link from "next/link";

export default function AuthGuard({ children }: { children: React.ReactNode }) {

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchUser,
    retry: false,
  });

  if (isLoading) {
    return <div className="p-6">로딩 중...</div>;
  }

  if (isError || !user) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-600">
        <div className="text-center">
          <p className="mb-4">로그인이 필요합니다.</p>
          <Link
            href="/login"
            className="bg-blue-600 text-white px-4 py-2 rounded inline-block"
          >
            로그인하러 가기
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
