import { deleteCookie, getCookie } from "cookies-next";
import { APIErrorResponse, APISuccessResponse } from "@/types/api";
import { buildHeaders, resolveUrl } from "./buildHeaders";
import { parseErrorResponse } from "./parseError";
import { refreshToken } from "./refresh/client";
import { objectToQueryString, QueryParams } from "./util/objectToQueryString";

interface ClientFetchOptions extends RequestInit {
  retry?: boolean;
  needAuth?: boolean;
  params?: QueryParams;
}

export const client = async <T>(
  input: RequestInfo | URL,
  options: ClientFetchOptions = {},
): Promise<T> => {
  const { retry = true, needAuth = true, params, ...init } = options;

  const query = params ? `?${objectToQueryString(params)}` : "";
  const resolvedUrl =
    typeof input === "string" ? `${resolveUrl(input)}${query}` : input;

  try {
    const accessToken = getCookie("access_token");
    const headers = buildHeaders(init.headers, accessToken, needAuth);

    if (!accessToken && needAuth) {
      throw new APIErrorResponse({
        code: "NO_ACCESS_TOKEN",
        message: "access token 없음",
        statusCode: 401,
      });
    }

    const res = await fetch(resolvedUrl, {
      ...init,
      headers,
      credentials: "include",
    });

    const raw = await res.json();

    if ((res.status === 401 || res.status === 403) && retry) {
      const refreshed = await refreshToken();
      if (refreshed) {
        return await client<T>(input, {
          ...init,
          retry: false,
          needAuth,
          params,
        });
      } else {
        deleteCookie("access_token");
        deleteCookie("refresh_token");
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
    const isTokenMissing =
      err instanceof APIErrorResponse && err.code === "NO_ACCESS_TOKEN";
    const isDev = process.env.NODE_ENV === "development";
    if (!isTokenMissing && isDev) {
      console.error("🔥 client fetch error ->", input, err);
    }

    throw err;
  }
};
