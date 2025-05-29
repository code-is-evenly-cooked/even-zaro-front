import { APIErrorResponse } from "@/types/api";

export const parseErrorResponse = (
  body: unknown,
  fallbackStatusCode: number,
): never => {
  const isObject = typeof body === "object" && body !== null;
  const b = isObject ? (body as Record<string, unknown>) : {};

  const message = typeof b.message === "string" ? b.message : null;
  const code = typeof b.code === "string" ? b.code : null;

  const status =
    typeof b.status === "number"
      ? b.status
      : typeof b.status === "string" && !isNaN(Number(b.status))
        ? Number(b.status)
        : fallbackStatusCode;

  if (message && code) {
    throw new APIErrorResponse({ code, message, statusCode: status });
  }

  throw new APIErrorResponse({
    code: "UNKNOWN_ERROR",
    message: "예기치 못한 오류가 발생했습니다.",
    statusCode: fallbackStatusCode,
  });
};
