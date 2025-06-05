import { BaseInputProps } from "@/types/input";
import React, { forwardRef, memo } from "react";

const BaseInput = memo(
  forwardRef<HTMLInputElement, BaseInputProps>(
    (
      {
        icon,
        error,
        helper,
        size = "md",
        styleState = "default",
        fullWidth = true,
        className,
        containerClassName,
        disabled,
        rightElement,
        ...props
      },
      ref,
    ) => {
      const getInputStyles = () => {
        const baseStyles = `
          w-full
          bg-transparent
          text-gray900
          placeholder:text-gray600
          text-body
          rounded-lg
          transition-all
          duration-200
          focus:outline-none
          focus:ring-0
          ${rightElement ? "pr-18" : "pr-10"}
        `;

        const sizeStyles =
          {
            sm: `h-[1.5rem] px-[8px] py-[3px]`,
            md: "h-[2rem] px-[12px] py-[5px]",
            lg: "h-[2.5rem] px-[16px] py-[9px]",
            xl: "h-[3.25rem] px-[24px] py-[14px]",
          }[size] || "h-32 px-[12px] py-[5px]";

        const stateStyles = {
          default: `
            border border-gray200
            focus:border-violet600
						focus:shadow-violetGlow
          `,
          invalid: `
            border border-violet600 shadow-violetGlow
          `,
        }[styleState];

        const disabledStyles = disabled
          ? `cursor-not-allowed disabled:bg-gray200`
          : ``;

        return `${baseStyles} ${sizeStyles} ${stateStyles} ${disabledStyles} ${
          className || ""
        }`;
      };
      return (
        <div
          className={`
            relative
            ${fullWidth ? "w-full" : "w-auto"}
            ${containerClassName || ""}
            transition-all duration-300 rounded-lg
          `}
        >
          {icon && (
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
              {icon}
            </div>
          )}

          <div className="relative">
            <input
              ref={ref}
              disabled={disabled}
              className={`peer relative z-10 ${getInputStyles()}`}
              {...props}
            />

            {rightElement && (
              <div
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20"
                tabIndex={-1}
              >
                {rightElement}
              </div>
            )}
          </div>

          {(error || helper) && (
            <p
              className={`mt-1.5 mx-2 text-sm ${
                error ? "text-red-500" : "text-gray600"
              }`}
            >
              {error || helper}
            </p>
          )}
        </div>
      );
    },
  ),
);

export default BaseInput;
