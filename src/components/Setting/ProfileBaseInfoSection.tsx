"use client";

import { getProfileImageUrl } from "@/utils/image";
import Image from "next/image";
import TextInput from "../common/Input/TextInput";
import BaseButton from "../common/Button/BaseButton";
import { EditIcon } from "lucide-react";
import { UserInfo } from "@/stores/useAuthStore";
import FormFieldRow from "./FormFieldRow";
import { useRef, useState } from "react";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo((prev) => ({ ...prev, nickname: e.target.value }));
  };
  const handleClickEdit = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageUrl = URL.createObjectURL(file);

    setUserInfo((prev) => ({ ...prev, profileImage: imageUrl }));
  };

  return (
    <section className="flex flex-col border rounded-sm px-4 py-6 gap-6">
      <h2 className="text-lg font-bold">기본 정보</h2>
      <div className="flex flex-col gap-8 mx-4">
        <div className="relative w-[80px] h-[80px]">
          <Image
            src={getProfileImageUrl(userInfo.profileImage)}
            alt="프로필"
            width={80}
            height={80}
            className="rounded-full border"
            priority
          />
          <button
            type="button"
            className="absolute -top-0.5 -right-1 bg-violet600 rounded-full p-1 shadow-md hover:bg-violet-500"
            aria-label="프로필 수정"
            onClick={handleClickEdit}
          >
            <EditIcon className="w-5 h-5 text-violet800 m-0.5" />
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
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
        >
          닉네임 변경하기
        </BaseButton>
      </div>
    </section>
  );
};

export default ProfileBaseInfoSection;
