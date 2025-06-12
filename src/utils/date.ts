import {
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  formatDistanceToNow,
  format,
  parse,
  isValid,
  isAfter,
  parseISO,
  differenceInCalendarDays,
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
  const zonedDate = toZonedTime(new Date(isoString), timeZone);
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

/**
 * 날짜 문자열 유효성 검사
 * - 형식이 yyyy.MM.dd 인지 확인
 * - 존재하지 않는 날짜(ex. 2023.02.30 등)인지 확인
 * - 오늘보다 미래 날짜인지 확인
 *
 * @param dateStr 사용자 입력 날짜 문자열
 * @returns 오류 메시지 (유효하면 null 반환)
 */
export const validateDateInput = (dateStr: string): string | null => {
  const dateString = convertDashToDot(dateStr);
  const dateRegex = /^\d{4}\.(0[1-9]|1[0-2])\.(0[1-9]|[12]\d|3[01])$/;
  if (!dateRegex.test(dateString)) {
    return "날짜 형식이 올바르지 않습니다. 예: 1990.01.01";
  }

  const parsedDate = parse(dateString, "yyyy.MM.dd", new Date());
  if (!isValid(parsedDate)) {
    return "존재하지 않는 날짜입니다.";
  }

  if (isAfter(parsedDate, new Date())) {
    return "미래 날짜는 입력할 수 없습니다.";
  }

  return null;
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

/**
 * 오늘 포함해서 기준일로부터 며칠째인지 계산 (과거 날짜만 허용)
 * @param dateStr 기준 날짜 (ISO 문자열 | null | undefined)
 * @returns "D+1", "D+2" 등. 유효하지 않거나 미래면 빈 문자열 반환
 */
export const getDdayLabel = (dateString?: string | null): string => {
  if (!dateString) return "";

  const date = parseISO(dateString);
  if (!isValid(date)) return "";

  const today = new Date();
  const diff = differenceInCalendarDays(today, date);

  if (diff < 0) return ""; // 미래는 제외
  return `D+${diff + 1}`; // 오늘 포함
};
