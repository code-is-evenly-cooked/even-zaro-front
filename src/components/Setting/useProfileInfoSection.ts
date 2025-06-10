"use client";

import { Gender, MBTI, UserInfo } from "@/stores/useAuthStore";
import { validateDateInput } from "@/utils/date";
import { useCallback, useState } from "react";

interface UseProfileInfoSectionProp {
  user: UserInfo;
}

interface FormError {
  birthday?: string;
  liveAloneDate?: string;
}

const useProfileInfoSection = ({ user }: UseProfileInfoSectionProp) => {
  const [errors, setErrors] = useState<FormError>({});
  const [userInfo, setUserInfo] = useState<{
    birthday: string;
    liveAloneDate: string;
    gender?: Gender;
    mbti?: MBTI;
  }>({
    birthday: user.birthday ?? "",
    liveAloneDate: user.liveAloneDate ?? "",
    gender: user.gender,
    mbti: user.mbti,
  });

  const handleChange = <T extends keyof typeof userInfo>(
    key: T,
    value: (typeof userInfo)[T],
  ) => {
    setUserInfo((prev) => ({ ...prev, [key]: value }));

    if (key === "birthday" && typeof value === "string") {
      if (!validateDateInput(value))
        setErrors((prev) => ({ ...prev, birthday: "" }));
    }

    if (key === "liveAloneDate" && typeof value === "string") {
      if (!validateDateInput(value))
        setErrors((prev) => ({ ...prev, liveAloneDate: "" }));
    }
  };

  const handleSave = async () => {
    console.log(userInfo);
  };

  return { userInfo, errors, handleChange, handleSave };
};

export default useProfileInfoSection;
