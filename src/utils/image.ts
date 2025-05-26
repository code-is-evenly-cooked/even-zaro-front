/**
 * 프로필 이미지의 최종 URL을 반환합니다.
 *
 * - 카카오 CDN 이미지인 경우: 해당 URL을 그대로 반환합니다.
 * - 내부 서버 이미지인 경우: 환경변수(NEXT_PUBLIC_IMAGE_BASE_URL)를 prefix로 하여 전체 URL을 구성합니다.
 * - 이미지가 없는 경우: 기본 프로필 아이콘(/icons/defaultProfile.svg)을 반환합니다.
 *
 * @param src 프로필 이미지 경로 또는 전체 URL (nullable)
 * @returns 실제로 사용할 이미지 URL 문자열
 */
export const getProfileImageUrl = (src: string | null): string => {
  if (!src) return "/icons/defaultProfile.svg";
  if (src.startsWith("http") && src.includes("k.kakaocdn.net")) {
    return src;
  }
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  return `${baseUrl}${src.startsWith("/") ? src : "/" + src}`;
};
