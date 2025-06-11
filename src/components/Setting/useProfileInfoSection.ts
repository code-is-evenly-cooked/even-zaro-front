"use client";

import { updateProfile, UpdateProfileParams } from "@/lib/api/profile";
import { getErrorMessage } from "@/lib/error/getErrorMessage";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { Gender, MBTI, useAuthStore, UserInfo } from "@/stores/useAuthStore";
import { convertDotToDash, validateDateInput } from "@/utils/date";
import { useCallback, useState } from "react";

interface UseProfileInfoSectionProp {
  user: UserInfo;
}

interface FormError {
  birthday?: string;
  liveAloneDate?: string;
}

const useProfileInfoSection = ({ user }: UseProfileInfoSectionProp) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormError>({});
  const { setUser } = useAuthStore();
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

  const { showToastMessage } = useToastMessageContext();

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

  const validateForm = useCallback(() => {
    const newErrors: FormError = {};

    const birthdayError = validateDateInput(userInfo.birthday);
    if (birthdayError) newErrors.birthday = birthdayError;

    const liveAloneDateError = validateDateInput(userInfo.liveAloneDate);
    if (liveAloneDateError) newErrors.liveAloneDate = liveAloneDateError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [userInfo.birthday, userInfo.liveAloneDate]);

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const item: UpdateProfileParams = {
        birthday: convertDotToDash(userInfo.birthday),
        liveAloneDate: convertDotToDash(userInfo.liveAloneDate),
        gender: userInfo.gender,
        mbti: userInfo.mbti,
      };
      console.log(item);

      await updateProfile(item);

      setUser({
        ...user,
        birthday: item.birthday ?? null,
        liveAloneDate: item.liveAloneDate ?? null,
        gender: (item.gender as Gender) ?? undefined,
        mbti: (item.mbti as MBTI) ?? undefined,
      });
      showToastMessage({
        type: "success",
        message: "프로필 업데이트가 완료되었습니다.",
      });
    } catch (error) {
      showToastMessage({
        type: "error",
        message: getErrorMessage(error, "프로필 업데이트 실패"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { userInfo, isLoading, errors, handleChange, handleSave };
};

export default useProfileInfoSection;
