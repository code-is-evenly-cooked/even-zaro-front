import { UserInfo } from "@/stores/useAuthStore";
import FormFieldRow from "./FormFieldRow";
import BaseButton from "../common/Button/BaseButton";
import DateInput from "../common/Input/DateInput";
import GenderRadioGroup from "./GenderRadioGroup";
import MbtiSelect from "./MbtiSelectBox";
import useProfileInfoSection from "./useProfileInfoSection";

interface ProfileInfoSectionProp {
  user: UserInfo;
}

const ProfileInfoSection = ({ user }: ProfileInfoSectionProp) => {
  const { userInfo, errors, handleChange, handleSave } = useProfileInfoSection({
    user,
  });

  return (
    <section className="flex flex-col border rounded-sm px-4 py-6 gap-6">
      <h2 className="text-lg font-bold">프로필 정보</h2>
      <ul className="space-y-2 px-8">
        <FormFieldRow label="생년월일">
          <DateInput
            size="xl"
            fullWidth={false}
            styleState={errors.birthday ? "invalid" : "default"}
            error={errors.birthday}
            value={userInfo.birthday}
            onChange={(value) => handleChange("birthday", value)}
            className="w-80"
          />
        </FormFieldRow>
        <FormFieldRow label="자취 시작일">
          <DateInput
            size="xl"
            fullWidth={false}
            styleState={errors.liveAloneDate ? "invalid" : "default"}
            error={errors.liveAloneDate}
            value={userInfo.liveAloneDate}
            onChange={(value) => handleChange("liveAloneDate", value)}
            className="w-80"
          />
        </FormFieldRow>
        <FormFieldRow label="성별">
          <GenderRadioGroup
            value={userInfo.gender}
            onChange={(selected) => handleChange("gender", selected)}
          />
        </FormFieldRow>
        <FormFieldRow label="MBTI">
          <MbtiSelect
            value={userInfo.mbti}
            onChange={(value) => handleChange("mbti", value)}
          />
        </FormFieldRow>
      </ul>
      <BaseButton
        size="xl"
        variant="filled"
        color="violet800"
        className="w-6/12 items-center mx-auto"
        onClick={handleSave}
      >
        프로필 변경
      </BaseButton>
    </section>
  );
};

export default ProfileInfoSection;
