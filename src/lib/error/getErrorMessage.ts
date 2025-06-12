/**
 * 서버 또는 클라이언트에서 발생한 에러 객체에서 메시지를 추출합니다.
 * 안전하게 타입을 검사하며, message가 없을 경우 fallback을 반환합니다.
 *
 * @param err - 에러 객체 (unknown)
 * @param fallback - 기본 메시지 (default: "알 수 없는 오류가 발생했습니다")
 * @returns 에러 메시지 문자열
 */
export function getErrorMessage(
  err: unknown,
  fallback = "알 수 없는 오류가 발생했습니다",
): string {
  if (typeof err === "object" && err !== null && "message" in err) {
    const msg = (err as { message?: unknown }).message;
    if (typeof msg === "string") return msg;
  }
  return fallback;
}
