import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchUser } from "@/lib/api/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: fetchUser,
    retry: false,
  });

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        <div className="text-center">
          <p className="mb-4">로그인이 필요합니다.</p>
          <button
            onClick={() => router.push("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            로그인
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
