import { InputHTMLAttributes, ReactNode } from "react";

export type InputSize = "sm" | "md" | "lg" | "xl";
export type StyleState = "default" | "invalid";

export interface InputStyleProps {
  size?: InputSize;
  styleState?: StyleState;
  fullWidth?: boolean;
}

export interface BaseInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    InputStyleProps {
  icon?: ReactNode;
  error?: string;
  helper?: string;
  containerClassName?: string;
  rightElement?: ReactNode;
}
