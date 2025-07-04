"use client";

import TextInput from "../common/Input/TextInput";
import BaseButton from "../common/Button/BaseButton";
import { useAuthStore, UserInfo } from "@/stores/useAuthStore";
import FormFieldRow from "./FormFieldRow";
import { useState } from "react";
import ProfileImageUploader from "./ProfileImageUploader";
import { updateNickname } from "@/lib/api/profile";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { getErrorMessage } from "@/lib/error/getErrorMessage";

interface ProfileBaseInfoSectionProp {
  user: UserInfo;
}
const ProfileBaseInfoSection = ({ user }: ProfileBaseInfoSectionProp) => {
  const [userInfo, setUserInfo] = useState<{
    nickname: string;
    profileImage: string;
  }>({
    nickname: user.nickname,
    profileImage: user.profileImage ?? "",
  });
  const { setUser } = useAuthStore();
  const { showToastMessage } = useToastMessageContext();

  const handleChangeNickname = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setUserInfo((prev) => ({ ...prev, nickname: e.target.value }));
  };

  const handleSubmitNickname = async () => {
    console.log(userInfo.nickname);
    try {
      const res = await updateNickname(userInfo.nickname);
      showToastMessage({ type: "success", message: "닉네임이 변경되었어요." });
      setUser({ ...user, nickname: res.nickname });
    } catch (error) {
      showToastMessage({
        type: "error",
        message: getErrorMessage(error, "닉네임 변경 실패"),
      });
    }
  };

  return (
    <section className="flex flex-col border rounded-sm px-4 py-6 gap-6">
      <h2 className="text-lg font-bold">기본 정보</h2>
      <div className="flex flex-col gap-8 mx-4">
        <ProfileImageUploader
          initialImage={userInfo.profileImage}
          onUploaded={() => {}}
        />
        <ul className="space-y-2 px-8">
          <FormFieldRow label="이메일">
            <TextInput
              size="xl"
              fullWidth={false}
              placeholder={user.email}
              disabled
              className="w-80"
            />
          </FormFieldRow>
          <FormFieldRow label="닉네임">
            <TextInput
              size="xl"
              fullWidth={false}
              value={userInfo.nickname}
              onChange={handleChangeNickname}
              placeholder="닉네임을 입력하세요"
              helper="닉네임은 14일마다 한번 변경할 수 있어요."
              className="w-80"
            />
          </FormFieldRow>
        </ul>
        <BaseButton
          size="xl"
          variant="filled"
          color="violet800"
          className="w-6/12 items-center mx-auto"
          onClick={handleSubmitNickname}
        >
          닉네임 변경하기
        </BaseButton>
      </div>
    </section>
  );
};

export default ProfileBaseInfoSection;
