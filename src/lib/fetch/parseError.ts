import { APIErrorResponse } from "@/types/api";

export const parseErrorResponse = (
  body: unknown,
  fallbackStatusCode: number,
): APIErrorResponse => {
  if (
    typeof body === "object" &&
    body !== null &&
    "message" in body &&
    "code" in body
  ) {
    const b = body as Record<string, unknown>;

    if (typeof b.message === "string" && typeof b.code === "string") {
      return new APIErrorResponse({
        code: b.code,
        message: b.message,
        statusCode:
          typeof b.status === "number" ? b.status : fallbackStatusCode,
      });
    }
  }

  return new APIErrorResponse({
    code: "UNKNOWN_ERROR",
    message: "예기치 못한 오류가 발생했습니다.",
    statusCode: fallbackStatusCode,
  });
};
