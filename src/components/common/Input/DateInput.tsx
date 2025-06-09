"use client";

import React, { forwardRef, useState } from "react";
import BaseInput from "./BaseInput";
import { BaseInputProps } from "@/types/input";
import { formatDate } from "@/utils/date";

export type DateInputProps = Omit<
  BaseInputProps,
  "type" | "onChange" | "value"
> & {
  value: string;
  onChange: (value: string) => void;
};

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ value, onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(formatDate(value));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatDate(e.target.value);
      setInputValue(formatted);
      onChange(formatted);
    };

    return (
      <BaseInput
        {...props}
        ref={ref}
        type="text"
        inputMode="numeric"
        pattern="\d*"
        maxLength={10}
        value={inputValue}
        placeholder="1990.01.01"
        onChange={handleInputChange}
      />
    );
  },
);

DateInput.displayName = "DateInput";
export default DateInput;
