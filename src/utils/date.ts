import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  formatDistanceToNow,
  format,
} from "date-fns";
import { ko } from "date-fns/locale";

/**
 * 하루 이내면 "x분 전", 하루 이상이면 "yyyy.MM.dd"로 표기
 */
export const getFormattedTimeAgo = (isoDateString: string): string => {
  const date = new Date(isoDateString);
  const hoursDiff = differenceInHours(new Date(), date);

  if (hoursDiff < 24) {
    return formatDistanceToNow(date, { addSuffix: true, locale: ko }).replace(
      /^약 /,
      "",
    );
  } else {
    return format(date, "yyyy.MM.dd");
  }
};

/**
 * 알림 기능 / 상대 시간 표시 전용 (ex. "5분 전", "2일 전", "3주 전")
 * - 1분 미만: "방금"
 * - 1시간 미만: "x분"
 * - 1일 미만: "x시간"
 * - 7일 미만: "x일"
 * - 7일 이상: "x주"
 */
export const getRelativeTimeAgo = (isoDateString: string): string => {
  const now = new Date();
  const date = new Date(isoDateString);

  const minutes = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInDays(now, date);
  const weeks = differenceInWeeks(now, date);

  if (minutes < 1) return "방금";
  if (minutes < 60) return `${minutes}분`;
  if (hours < 24) return `${hours}시간`;
  if (days < 7) return `${days}일`;
  return `${weeks}주`;
};

/**
 * 댓글 날짜를 사용자 친화적으로 포맷함.
 * - 오늘이면 "00:00"으로 표시
 * - 오늘이 아니면 "yyyy.MM.dd" 형식으로 표시
 *
 * @param isoString - ISO 형식의 날짜 문자열
 * @returns 포맷된 날짜 문자열
 */
export const getSimplifiedDate = (isoString: string): string => {
  const now = new Date();
  const created = new Date(isoString);

  const isToday =
    created.getFullYear() === now.getFullYear() &&
    created.getMonth() === now.getMonth() &&
    created.getDate() === now.getDate();

  if (isToday) {
    // getUTCHours로 시간 오차 보정 (UTC 그대로 쓰기)
    const hours = String(created.getHours()).padStart(2, "0");
    const minutes = String(created.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return created
    .toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\. /g, ".")
    .replace(/\.$/, "");
};
