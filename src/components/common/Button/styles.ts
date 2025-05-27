import { ButtonSize, ButtonVariant, ButtonColor } from "@/types/button";

export const BASE_BUTTON_STYLES = `
  inline-flex
  items-center
  justify-center
  font-medium
  transition-all
  duration-200
  disabled:opacity-50
  disabled:cursor-not-allowed
  gap-2
`;

export const BUTTON_SIZE_STYLES: Record<ButtonSize, string> = {
  sm: "h-[1.5rem] px-[8px] py-[5px] rounded-md",
  md: "h-[2rem] px-[12px] py-[5px] rounded-md",
  lg: "h-[2.5rem] px-[16px] py-[9px] rounded-lg",
  xl: "h-[3.25rem] px-[24px] py-[14px] rounded-xl",
  full: "h-[2.5rem] w-full px-[16px] py-[9px] rounded-xl",
  icon: "h-[3.2rem] w-[3.2rem]",
};

export const BUTTON_VARIANT_STYLES: Record<
  ButtonVariant,
  Record<ButtonColor, string>
> = {
  filled: {
    violet300:
      "bg-violet300 text-white hover:bg-violet300/80 active:bg-violet300/60",
    violet800:
      "bg-violet800 text-white hover:bg-violet800/80 active:bg-violet800/60",
    skyblue100:
      "bg-skyblue100 text-gray900 hover:bg-skyblue100/80 active:bg-skyblue100/60",
    skyblue200:
      "bg-skyblue200 text-gray900 hover:bg-skyblue200/80 active:bg-skyblue200/60",
    skyblue300:
      "bg-skyblue300 text-gray900 hover:bg-skyblue300/80 active:bg-skyblue300/60",
  },
  outlined: {
    violet300:
      "text-violet300 border border-violet300 hover:bg-violet300/5 active:bg-violet300/10",
    violet800:
      "text-violet800 border border-violet600 hover:bg-violet800/5 active:bg-violet800/10",
    skyblue100:
      "text-gray900 border border-skyblue100 hover:bg-skyblue100/5 active:bg-skyblue100/10",
    skyblue200:
      "text-gray900 border border-skyblue200 hover:bg-skyblue200/5 active:bg-skyblue200/10",
    skyblue300:
      "text-gray900 border border-skyblue300 hover:bg-skyblue300/5 active:bg-skyblue300/10",
  },
  text: {
    violet300: "text-violet300 hover:bg-violet300/10 active:bg-violet300/20",
    violet800: "text-violet800 hover:bg-violet800/10 active:bg-violet800/20",
    skyblue100:
      "text-skyblue100 hover:bg-skyblue100/10 active:bg-skyblue100/20",
    skyblue200:
      "text-skyblue200 hover:bg-skyblue200/10 active:bg-skyblue200/20",
    skyblue300:
      "text-skyblue300 hover:bg-skyblue300/10 active:bg-skyblue300/20",
  },
};
