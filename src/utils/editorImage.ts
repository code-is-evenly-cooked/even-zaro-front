// 마크다운에서 이미지 URL들을 추출합니다
export function extractImageUrls(markdown: string): string[] {
  const regex = /!\[[^\]]*]\((.*?)\)/g;
  const matches = [...markdown.matchAll(regex)];
  return matches.map((match) => match[1]);
}

// 썸네일용 첫 번째 이미지 URL을 반환합니다
export function extractThumbnailUrl(markdown: string): string | null {
  const urls = extractImageUrls(markdown);
  return urls[0] ?? null;
}
