export const buildHeaders = (
  rawHeaders?: HeadersInit,
  accessToken?: string | unknown,
  needAuth: boolean = true,
): Headers => {
  const headers = new Headers(rawHeaders);

  if (needAuth && typeof accessToken === "string") {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  return headers;
};

export const resolveUrl = (input: RequestInfo | URL): string => {
  if (typeof input !== "string") return input.toString();

  const isApiRoute = input.startsWith("/api");

  return isApiRoute
    ? input // API Route로 처리
    : `${process.env.NEXT_PUBLIC_API_BASE_URL}${input}`; // 백엔드 API 호출
};
