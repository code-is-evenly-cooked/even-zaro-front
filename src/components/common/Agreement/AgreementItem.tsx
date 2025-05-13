import { AgreementsType } from "@/types/agreement";
import { Check, ChevronRight } from "lucide-react";
import React from "react";

interface AgreementItemProps {
  type: AgreementsType;
  label: string;
  required?: boolean;
  checked: boolean;
  onToggle: (type: AgreementsType) => void;
  onTermClick?: () => void;
}

const AgreementItem = ({
  type,
  label,
  required,
  checked,
  onToggle,
  onTermClick,
}: AgreementItemProps) => {
  return (
    <div className="flex items-center justify-between py-1">
      <label className="flex items-center justify-between py-1 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(type)}
          className="sr-only"
        />

        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 border flex justify-center items-center transition-colors ${
              checked ? "bg-violet600 border-violet600" : "border-violet600"
            }`}
          >
            {checked && <Check className="w-4 h-4 text-white" />}
          </div>

          <span className="flex text-gray900 text-sm gap-1">
            {required && <span className="text-violet800">필수</span>}
            {label}
          </span>
        </div>
        {onTermClick && (
          <button
            type="button"
            onClick={onTermClick}
            aria-label={`${label} 클릭`}
          >
            <ChevronRight
              className="text-gray600 w-4 h-4"
              onClick={() => {
                onTermClick?.();
              }}
            />
          </button>
        )}
      </label>
    </div>
  );
};

export default AgreementItem;
