"use client";

import { forwardRef, memo, useState } from "react";
import BaseInput from "./BaseInput";
import { BaseInputProps } from "@/types/input";
import IconButton from "../Button/IconButton";
import { EyeCloseIcon } from "../Icons";
import { EyeIcon } from "lucide-react";

export type PasswordInputProps = Omit<BaseInputProps, "type" | "rightElement">;

const PasswordInput = memo(
  forwardRef<HTMLInputElement, PasswordInputProps>((props, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
      setIsVisible(!isVisible);
    };

    const VisibilityToggle = (
      <IconButton
        icon={isVisible ? <EyeCloseIcon /> : <EyeIcon />}
        label={isVisible ? "비밀번호 숨기기" : "비밀번호 표시"}
        isTransparent
        onClick={toggleVisibility}
        tabIndex={-1}
      />
    );

    return (
      <BaseInput
        type={isVisible ? "text" : "password"}
        ref={ref}
        rightElement={VisibilityToggle}
        {...props}
      />
    );
  }),
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
