import { UserInfo } from "@/stores/useAuthStore";
import TextInput from "../common/Input/TextInput";
import FormFieldRow from "./FormFieldRow";
import BaseButton from "../common/Button/BaseButton";
import DateInput from "../common/Input/DateInput";

interface ProfileInfoSectionProp {
  user: UserInfo;
}

const ProfileInfoSection = ({ user }: ProfileInfoSectionProp) => {
  return (
    <section className="flex flex-col border rounded-sm px-4 py-6 gap-6">
      <h2 className="text-lg font-bold">프로필 정보</h2>
      <ul className="space-y-4 px-8">
        <FormFieldRow label="생년월일">
          <DateInput
            size="xl"
            fullWidth={false}
            value={user.birthday ?? ""}
            onChange={() => {}}
            containerClassName="w-80"
          />
        </FormFieldRow>
        <FormFieldRow label="자취 시작일">
          <DateInput
            size="xl"
            fullWidth={false}
            value={user.liveAloneDate ?? ""}
            onChange={() => {}}
            containerClassName="w-80"
          />
        </FormFieldRow>
        <FormFieldRow label="성별">
          <TextInput
            size="xl"
            fullWidth={false}
            value={user.birthday ?? ""}
            placeholder="성별을 선택해주세요"
            containerClassName="w-80"
          />
        </FormFieldRow>
        <FormFieldRow label="MBTI">
          <TextInput
            size="xl"
            fullWidth={false}
            value={user.birthday ?? ""}
            placeholder="MBTI을 선택해주세요"
            containerClassName="w-80"
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
