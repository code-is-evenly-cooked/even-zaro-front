import { cookies } from "next/headers";

export const refreshTokenSSR = async (): Promise<string | null> => {
  const refreshToken = (await cookies()).get("refresh_token")?.value;
  if (!refreshToken) return null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${refreshToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    const body = await res.json();
    const accessToken = body?.data?.accessToken;

    if (!res.ok || typeof accessToken !== "string") return null;

    // SSR에서는 쿠키를 설정할 수 없기 때문에 client에서 갱신
    return accessToken;
  } catch (err) {
    console.error("SSR refresh 실패:", err);
    return null;
  }
};
