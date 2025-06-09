"use client";

import { Gender } from "@/stores/useAuthStore";
import React from "react";

interface GenderRadioGroupProps {
  value?: Gender;
  onChange: (value: Gender) => void;
  id?: string;
  className?: string;
}

const options = [
  { label: "남성", value: "MALE" },
  { label: "여성", value: "FEMALE" },
];

const GenderRadioGroup = ({
  value,
  onChange,
  id = "gender",
  className = "",
}: GenderRadioGroupProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.value as Gender;
    onChange(selected);
  };

  return (
    <fieldset className={`flex gap-6 px-4 py-1 ${className}`}>
      <legend className="sr-only">성별 선택</legend>
      {options.map((option) => {
        const inputId = `${id}-${option.value}`;
        return (
          <label
            key={option.value}
            htmlFor={inputId}
            className="flex items-center gap-2 text-gray900"
          >
            <input
              type="radio"
              id={inputId}
              name={id}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              className="accent-violet600"
            />
            {option.label}
          </label>
        );
      })}
    </fieldset>
  );
};

export default GenderRadioGroup;
