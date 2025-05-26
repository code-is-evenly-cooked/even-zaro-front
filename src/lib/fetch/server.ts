import { cookies } from "next/headers";
import { APIErrorResponse, APISuccessResponse } from "@/types/api";
import { buildHeaders, resolveUrl } from "./buildHeaders";
import { parseErrorResponse } from "./parseError";
import { refreshTokenSSR } from "./refresh/server";

interface ServerFetchOptions extends RequestInit {
  retry?: boolean;
  needAuth?: boolean;
}

export const server = async <T>(
  input: RequestInfo | URL,
  options: ServerFetchOptions = {},
): Promise<T> => {
  const { retry = true, needAuth = true, ...init } = options;

  const accessToken = (await cookies()).get("access_token")?.value;
  const headers = buildHeaders(init.headers, accessToken, needAuth);

  const res = await fetch(resolveUrl(input), {
    ...init,
    headers,
    cache: "no-store",
  });

  const body = await res.json();

  if ((res.status === 401 || res.status === 403) && retry) {
    const newToken = await refreshTokenSSR();
    if (!newToken) {
      throw new APIErrorResponse({
        code: "AUTH_EXPIRED",
        message: "세션이 만료되었습니다. 다시 로그인해주세요.",
        statusCode: 401,
      });
    }

    const retryHeaders = buildHeaders(init.headers, newToken, true);

    const retryRes = await fetch(resolveUrl(input), {
      ...init,
      headers: retryHeaders,
      cache: "no-store",
    });

    const retryBody = await retryRes.json();

    if (!retryRes.ok) throw parseErrorResponse(retryBody, retryRes.status);

    return (retryBody as APISuccessResponse<T>).data;
  }

  if (!res.ok) throw parseErrorResponse(body, res.status);

  return (body as APISuccessResponse<T>).data;
};
