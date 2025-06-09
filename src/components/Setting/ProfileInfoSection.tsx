import { Gender, MBTI, UserInfo } from "@/stores/useAuthStore";
import FormFieldRow from "./FormFieldRow";
import BaseButton from "../common/Button/BaseButton";
import DateInput from "../common/Input/DateInput";
import GenderRadioGroup from "./GenderRadioGroup";
import { useState } from "react";
import MbtiSelect from "./MbtiSelectBox";

interface ProfileInfoSectionProp {
  user: UserInfo;
}

const ProfileInfoSection = ({ user }: ProfileInfoSectionProp) => {
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
  return (
    <section className="flex flex-col border rounded-sm px-4 py-6 gap-6">
      <h2 className="text-lg font-bold">프로필 정보</h2>
      <ul className="space-y-2 px-8">
        <FormFieldRow label="생년월일">
          <DateInput
            size="xl"
            fullWidth={false}
            value={userInfo.birthday}
            onChange={(value) =>
              setUserInfo((prev) => ({ ...prev, birthday: value }))
            }
            className="w-80"
          />
        </FormFieldRow>
        <FormFieldRow label="자취 시작일">
          <DateInput
            size="xl"
            fullWidth={false}
            value={userInfo.liveAloneDate}
            onChange={(value) =>
              setUserInfo((prev) => ({ ...prev, liveAloneDate: value }))
            }
            className="w-80"
          />
        </FormFieldRow>
        <FormFieldRow label="성별">
          <GenderRadioGroup
            value={userInfo.gender}
            onChange={(selected) =>
              setUserInfo((prev) => ({ ...prev, gender: selected }))
            }
          />
        </FormFieldRow>
        <FormFieldRow label="MBTI">
          <MbtiSelect
            value={userInfo.mbti}
            onChange={(value) =>
              setUserInfo((prev) => ({ ...prev, mbti: value }))
            }
          />
        </FormFieldRow>
      </ul>
      <BaseButton
        size="xl"
        variant="filled"
        color="violet800"
        className="w-6/12 items-center mx-auto"
      >
        프로필 변경
      </BaseButton>
    </section>
  );
};

export default ProfileInfoSection;
