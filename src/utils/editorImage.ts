// 마크다운에서 이미지 Key들을 추출합니다
export function extractImageKeys(markdown: string): string[] {
  const regex = /!\[[^\]]*]\(https?:\/\/[^)]+\/(images\/post\/[^)]+)\)/g;
  const matches = [...markdown.matchAll(regex)];
  return matches.map((match) => match[1]);
}

// 썸네일용 첫 번째 이미지 Key를 반환합니다
export function extractThumbnailKey(markdown: string): string | null {
  const keys = extractImageKeys(markdown);
  return keys[0] ?? null;
}
