import { BaseInputProps } from "@/types/input";
import React, { forwardRef } from "react";
import BaseInput from "./BaseInput";

export type TextInpuProps = Omit<BaseInputProps, "type">;

const TextInput = forwardRef<HTMLInputElement, TextInpuProps>((props, ref) => {
  return <BaseInput type="text" ref={ref} {...props} />;
});

TextInput.displayName = "TextInput";

export default TextInput;
