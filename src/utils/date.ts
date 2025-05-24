import { formatDistanceToNow, differenceInHours, format } from "date-fns";
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
