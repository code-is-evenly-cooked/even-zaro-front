import { setCookie, deleteCookie } from "cookies-next";
import { APIErrorResponse, APISuccessResponse } from "@/types/api";
import { parseErrorResponse } from "../parseError";

let refreshPromise: Promise<boolean> | null = null;

export const refreshToken = async (): Promise<boolean> => {
  if (refreshPromise) return refreshPromise;

  refreshPromise = new Promise(async (resolve) => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include",
      });

      const raw = await res.json();

      if (res.ok) {
        const body = raw as APISuccessResponse<{ accessToken: string }>;

        if (!body.data?.accessToken) {
          throw new APIErrorResponse({
            code: "AUTH_EXPIRED",
            message: "accessToken이 존재하지 않습니다.",
            statusCode: 401,
          });
        }

        const accessToken = body.data.accessToken;

        setCookie("access_token", accessToken, {
          path: "/",
          maxAge: 60 * 60 * 24,
          sameSite: "lax",
          secure: process.env.NODE_ENV === "production",
        });

        resolve(true);
      } else {
        throw parseErrorResponse(raw, res.status);
      }
    } catch (err) {
      console.error("refreshToken fetch error ->", err);
      deleteCookie("access_token");
      deleteCookie("refresh_token");
      resolve(false);
    } finally {
      refreshPromise = null;
    }
  });

  return refreshPromise;
};
