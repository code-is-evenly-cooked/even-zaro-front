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
