import { memo, forwardRef, useMemo } from "react";

import { BaseButtonProps, ButtonColor, ButtonVariant } from "@/types/button";
import {
  BASE_BUTTON_STYLES,
  BUTTON_SIZE_STYLES,
  BUTTON_VARIANT_STYLES,
} from "./styles";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const BaseButton = memo(
  forwardRef<HTMLButtonElement, BaseButtonProps>(
    (
      {
        type = "button",
        size = "md",
        variant = "filled",
        color = "violet300",
        leftIcon,
        rightIcon,
        isLoading,
        disabled,
        className,
        children,
        ...props
      },
      ref,
    ) => {
      const buttonStyles = useMemo(() => {
        const loadingStyles = isLoading ? "cursor-wait" : "";
        const variantStyleMap = BUTTON_VARIANT_STYLES[variant as ButtonVariant];
        const variantClass = variantStyleMap?.[color as ButtonColor] || "";

        return `${BASE_BUTTON_STYLES} ${BUTTON_SIZE_STYLES[size]} ${variantClass} ${loadingStyles} ${className || ""}`;
      }, [size, variant, color, isLoading, className]);

      return (
        <button
          ref={ref}
          type={type}
          disabled={disabled || isLoading}
          className={buttonStyles}
          {...props}
        >
          {leftIcon && <span className="inline-flex">{leftIcon}</span>}
          {isLoading ? (
            <span className="inline-flex items-center gap-2">
              <LoadingSpinner />
              로딩중...
            </span>
          ) : (
            children
          )}
          {rightIcon && <span className="inline-flex">{rightIcon}</span>}
        </button>
      );
    },
  ),
);

BaseButton.displayName = "BaseButton";

export default BaseButton;
