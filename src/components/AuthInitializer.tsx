import { useEffect } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/lib/api/auth";

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser, clearUser } = useAuthStore();

  const { data, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data && !user) {
      setUser(data);
    }
    if (error) {
      clearUser();
    }
  }, [data, error]);

  return <>{children}</>;
};

export default AuthInitializer;
