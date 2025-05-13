export type ButtonSize = "sm" | "md" | "lg" | "full" | "icon";
export type ButtonVariant = "filled" | "outlined" | "text";
export type IconButtonVariant = "icon" | "icon-round";
export type ButtonColor =
  | "violet300"
  | "violet800"
  | "skyblue100"
  | "skyblue200"
  | "skyblue300";

export interface BaseButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "variant"> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  color?: ButtonColor;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}
