export function createSuccessResponse<T>(
  data: T,
  message = "요청 성공",
  status = 200,
) {
  return new Response(JSON.stringify({ message, data }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export function createErrorResponse(message: string, status = 400) {
  return new Response(JSON.stringify({ status, message }), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
