import { getCookie } from "cookies-next";
import { APIErrorResponse, APISuccessResponse } from "@/types/api";
import { buildHeaders, resolveUrl } from "./buildHeaders";
import { parseErrorResponse } from "./parseError";
import { refreshToken } from "./refresh/client";

interface ClientFetchOptions extends RequestInit {
  retry?: boolean;
  needAuth?: boolean;
}

export const client = async <T>(
  input: RequestInfo | URL,
  options: ClientFetchOptions = {},
): Promise<T> => {
  const { retry = true, needAuth = true, ...init } = options;

  try {
    const accessToken = getCookie("access_token");
    const headers = buildHeaders(init.headers, accessToken, needAuth);

    const res = await fetch(resolveUrl(input), {
      ...init,
      headers,
      credentials: "include",
    });

    const raw = await res.json();

    if ((res.status === 401 || res.status === 403) && retry) {
      const refreshed = await refreshToken(); // 기존 함수 사용
      if (refreshed) {
        return await client<T>(input, { ...init, retry: false, needAuth });
      } else {
        window.location.href = "/login";
        throw new APIErrorResponse({
          code: "AUTH_EXPIRED",
          message: "로그인이 필요합니다.",
          statusCode: 401,
        });
      }
    }

    if (!res.ok) {
      throw parseErrorResponse(raw, res.status);
    }

    return (raw as APISuccessResponse<T>).data;
  } catch (err) {
    console.error("🔥 client fetch error ->", err);
    throw err;
  }
};
