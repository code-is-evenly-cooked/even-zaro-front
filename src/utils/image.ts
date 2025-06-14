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

  // 카카오 CDN 이미지인 경우
  if (src.startsWith("http") && src.includes("k.kakaocdn.net")) return src;

  // 로컬 미리보기
  if (src.startsWith("blob:")) return src;

  // 이미 full URL일 경우
  if (src.startsWith("http")) return src;

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  return `${baseUrl}${src.startsWith("/") ? src : "/" + src}`;
};

/**
 * 이미지 경로를 전체 URL로 변환합니다.
 *
 * - null이거나 빈 값일 경우, 기본 프로필 이미지 경로 반환
 * - 절대 경로(/로 시작하지 않음)는 자동으로 보정
 * - 환경변수 `NEXT_PUBLIC_IMAGE_BASE_URL` 기반으로 full URL 구성
 *
 * @param src 이미지 경로 (예: "/users/profile.png" 또는 "users/profile.png")
 * @returns 최종적으로 사용할 이미지 URL
 */
export const getImageUrl = (src: string | null): string => {
  if (!src) return "/icons/placeholderImage.svg";

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  if (!baseUrl) {
    console.warn(
      "환경변수 'NEXT_PUBLIC_IMAGE_BASE_URL'이 설정되지 않았습니다.",
    );
    return src.startsWith("/") ? src : `/${src}`;
  }

  const normalizedPath = src.replace(/^\/?/, "/"); // 슬래시 없으면 추가
  return `${baseUrl}${normalizedPath}`;
};

/**
 * 마크다운 이미지 태그 (![alt](url))를 제거한 문자열을 반환합니다.
 * @param content 마크다운 콘텐츠 문자열
 * @returns 이미지 태그가 제거된 문자열
 */
export function removeMarkdownImages(content: string): string {
  return content.replace(/!\[.*?\]\(.*?\)/g, "");
}
