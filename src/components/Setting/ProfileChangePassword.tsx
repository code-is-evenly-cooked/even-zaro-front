import BaseButton from "../common/Button/BaseButton";
import PasswordInput from "../common/Input/PasswordInput";
import FormFieldRow from "./FormFieldRow";
import useProfileChangePassword from "./useProfileChangePassword";

const ProfileChangePassword = () => {
  const { formState, handleFormChange, errors } = useProfileChangePassword();
  return (
    <section className="flex flex-col border rounded-sm px-4 py-6 gap-6">
      <h2 className="text-lg font-bold">비밀번호 변경</h2>
      <ul className="space-y-2 px-8">
        <FormFieldRow label="현재 비밀번호">
          <PasswordInput
            placeholder="현재 비밀번호를 입력하세요"
            size="xl"
            value={formState.currentPassword}
            onChange={handleFormChange("currentPassword")}
            styleState={errors.currentPassword ? "invalid" : "default"}
            error={errors.currentPassword}
            containerClassName="w-80"
          />
        </FormFieldRow>
        <FormFieldRow label="새 비밀번호">
          <PasswordInput
            placeholder="새 비밀번호를 입력하세요"
            size="xl"
            value={formState.newPassword}
            onChange={handleFormChange("newPassword")}
            styleState={errors.newPassword ? "invalid" : "default"}
            error={errors.newPassword}
            containerClassName="w-80"
          />
        </FormFieldRow>
        <FormFieldRow label="비밀번호 확인">
          <PasswordInput
            placeholder="새 비밀번호를 다시 입력하세요"
            size="xl"
            value={formState.confirmPassword}
            onChange={handleFormChange("confirmPassword")}
            styleState={errors.confirmPassword ? "invalid" : "default"}
            error={errors.confirmPassword}
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
        비밀번호 변경
      </BaseButton>
    </section>
  );
};

export default ProfileChangePassword;
