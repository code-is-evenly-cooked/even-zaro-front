import { cookies } from "next/headers";

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

// SSR에서 쿠키 저장
export async function saveAuthCookies({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const cookieStore = await cookies();
  const isProd = process.env.NODE_ENV === "production";

  // 공통 설정
  const baseOptions = {
    path: "/",
    secure: isProd,
  };

  // accessToken: CSR에서도 사용 가능
  cookieStore.set(ACCESS_TOKEN, accessToken, {
    ...baseOptions,
    maxAge: 60 * 60 * 24, // 1일
    sameSite: "lax",
  });

  // refreshToken: 서버에서만 사용
  cookieStore.set(REFRESH_TOKEN, refreshToken, {
    ...baseOptions,
    maxAge: 60 * 60 * 24 * 7, // 7일
    sameSite: "strict",
    httpOnly: true,
  });
}

// SSR에서 쿠키 삭제
export async function removeAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN);
  cookieStore.delete(REFRESH_TOKEN);
}
