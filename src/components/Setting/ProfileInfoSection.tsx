import { getProfileImageUrl } from "@/utils/image";
import Image from "next/image";
import TextInput from "../common/Input/TextInput";
import BaseButton from "../common/Button/BaseButton";
import { EditIcon } from "lucide-react";

const ProfileInfoSection = () => {
  return (
    <section className="flex flex-col border rounded-sm px-4 py-6 gap-8">
      <h2 className="text-lg font-bold">기본 정보</h2>
      <div className="flex flex-col gap-8 mx-4">
        <div className="relative w-[80px] h-[80px]">
          <Image
            src={getProfileImageUrl("")}
            alt="프로필"
            width={80}
            height={80}
            className="rounded-full"
            priority
          />
          <button
            type="button"
            className="absolute -top-0.5 -right-1 bg-violet600 rounded-full p-1 shadow-md hover:bg-violet-500"
            aria-label="프로필 수정"
          >
            <EditIcon className="w-5 h-5 text-violet800 m-0.5" />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex justify-start items-center gap-20">
            <p className="text-lg">이메일</p>
            <TextInput
              size="xl"
              fullWidth={false}
              placeholder="test@test.com"
              disabled
              containerClassName="w-5/12"
            />
          </div>
          <div className="flex justify-start items-center gap-20">
            <p className="text-lg">닉네임</p>
            <TextInput
              size="xl"
              fullWidth={false}
              placeholder="테스터"
              helper="닉네임은 14일마다 한번 변경할 수 있어요."
              containerClassName="w-5/12"
            />
          </div>
        </div>
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

export default ProfileInfoSection;
