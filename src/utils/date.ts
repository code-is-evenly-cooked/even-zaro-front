import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  formatDistanceToNow,
  format,
} from "date-fns";
import { ko } from "date-fns/locale";
import { toZonedTime, format as fnsTzFormat } from "date-fns-tz";

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
  const timeZone = "Asia/Seoul";

  const utcDate = new Date(isoString + "Z"); // UTC로 변경. 서버와 논의 후 제거하거나 붙여두거나
  const zonedDate = toZonedTime(new Date(utcDate), timeZone);
  const now = toZonedTime(new Date(), timeZone);

  const isToday =
    zonedDate.getFullYear() === now.getFullYear() &&
    zonedDate.getMonth() === now.getMonth() &&
    zonedDate.getDate() === now.getDate();

  if (isToday) {
    return fnsTzFormat(zonedDate, "HH:mm", { timeZone });
  }

  return fnsTzFormat(zonedDate, "yyyy.MM.dd", { timeZone });
};

export const convertDashToDot = (date: string): string => {
  return date.replace(/-/g, ".");
};

export const convertDotToDash = (date: string): string => {
  return date.replace(/\./g, "-");
};

export const formatDate = (val: string): string => {
  const numbersOnly = val.replace(/\D/g, "").slice(0, 8); // 숫자만 추출, 8자리까지 자르기
  const parts = [];

  if (numbersOnly.length >= 4) {
    parts.push(numbersOnly.slice(0, 4)); // yyyy
    if (numbersOnly.length >= 6) {
      parts.push(numbersOnly.slice(4, 6)); // MM
      if (numbersOnly.length > 6) {
        parts.push(numbersOnly.slice(6, 8)); // dd
      }
    } else {
      parts.push(numbersOnly.slice(4)); // MM만 입력 중
    }
  } else {
    parts.push(numbersOnly); // yyyy 입력 중
  }

  return parts.join(".");
};

export function getDdayFromDate(dateString?: string | null): string {
  if (!dateString) return "D+?";

  const start = new Date(dateString);
  const today = new Date();

  // 시간 요소 제거 (날짜만 비교)
  start.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diff = today.getTime() - start.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return `D+${days}`;
}