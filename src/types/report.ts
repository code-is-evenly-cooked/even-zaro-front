export type ReportType = "COMMENT" | "POST";

export enum ReportReason {
  SPAM = "SPAM",
  INSULT = "INSULT",
  INAPPROPRIATE = "INAPPROPRIATE",
  FRAUD = "FRAUD",
  SEXUAL = "SEXUAL",
  VIOLENCE = "VIOLENCE",
  ILLEGAL = "ILLEGAL",
  ETC = "ETC",
}

export const REPORT_REASON_LABEL: Record<ReportReason, string> = {
  SPAM: "스팸",
  INSULT: "욕설/비방",
  INAPPROPRIATE: "부적절한 콘텐츠",
  FRAUD: "사기/거짓 정보",
  SEXUAL: "음란/성적 콘텐츠",
  VIOLENCE: "폭력/혐오 표현",
  ILLEGAL: "불법 정보",
  ETC: "기타",
};
