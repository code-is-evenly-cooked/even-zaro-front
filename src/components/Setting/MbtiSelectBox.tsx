"use client";

import { MBTI, MBTI_LIST } from "@/stores/useAuthStore";
import { ChevronDownIcon } from "lucide-react";

interface MbtiSelectProps {
  value?: MBTI;
  onChange: (value: MBTI) => void;
  id?: string;
  className?: string;
}

const MbtiSelect = ({
  value,
  onChange,
  id = "mbti",
  className,
}: MbtiSelectProps) => {
  return (
    <div className={`relative w-80 ${className}`}>
      <select
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value as MBTI)}
        className={`
          w-full h-[3.25rem] px-4 pr-10 border border-gray300 
          rounded-md appearance-none focus:outline-none focus:ring-0
          text-gray900
        `}
      >
        <option value="">선택해주세요</option>
        {MBTI_LIST.map((mbti) => (
          <option key={mbti} value={mbti}>
            {mbti}
          </option>
        ))}
      </select>

      {/* ▼ 아이콘 */}
      <div className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-gray500 text-sm">
        <ChevronDownIcon />
      </div>
    </div>
  );
};

export default MbtiSelect;
