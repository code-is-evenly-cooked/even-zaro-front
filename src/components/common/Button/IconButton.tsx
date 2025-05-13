import { memo, forwardRef } from "react";
import type {
  BaseButtonProps,
  ButtonColor,
  ButtonSize,
  IconButtonVariant,
} from "@/types/button";

export type IconButtonProps = Omit<
  BaseButtonProps,
  "leftIcon" | "rightIcon" | "children" | "variant"
> & {
  icon: React.ReactNode;
  label: string;
  variant?: IconButtonVariant;
  isActive?: boolean;
  isTransparent?: boolean;
};

const getIconButtonClass = ({
  variant,
  color,
  size,
  isTransparent = false,
  isLoading = false,
  className = "",
}: {
  variant: IconButtonVariant;
  color: ButtonColor;
  size: ButtonSize;
  isTransparent?: boolean;
  isLoading?: boolean;
  className?: string;
}): string => {
  const base =
    "inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeClass = {
    sm: "h-[2.5rem] w-[2.5rem]",
    md: "h-[3rem] w-[3rem]",
    lg: "h-[3.5rem] w-[3.5rem]",
    full: "w-full h-[3rem]",
    icon: "h-[2rem] w-[2rem]",
  }[size];

  const shapeClass = {
    icon: "rounded-lg",
    "icon-round": "rounded-full",
  }[variant];

  const backgroundClass = isTransparent
    ? "bg-transparent"
    : {
        violet300: "bg-violet300 hover:bg-violet300/50",
        violet800: "bg-violet800 hover:bg-violet600/50",
        skyblue100: "bg-skyblue100 hover:bg-skyblue100/50",
        skyblue200: "bg-skyblue200 hover:bg-skyblue200/50",
        skyblue300: "bg-skyblue300 hover:bg-skyblue300/50",
      }[color];

  const loadingClass = isLoading ? "cursor-wait" : "";

  return `${base} ${sizeClass} ${shapeClass} ${backgroundClass} ${loadingClass} ${className}`.trim();
};

const IconButton = memo(
  forwardRef<HTMLButtonElement, IconButtonProps>(
    (
      {
        icon,
        label,
        variant = "icon",
        color = "violet300",
        size = "icon",
        isTransparent = false,
        isLoading = false,
        className,
        ...props
      },
      ref,
    ) => {
      const styles = getIconButtonClass({
        variant: variant,
        color,
        size,
        isTransparent,
        isLoading,
        className,
      });

      return (
        <button
          ref={ref}
          aria-label={label}
          disabled={isLoading || props.disabled}
          className={styles}
          {...props}
        >
          {icon}
        </button>
      );
    },
  ),
);

IconButton.displayName = "IconButton";

export default IconButton;
