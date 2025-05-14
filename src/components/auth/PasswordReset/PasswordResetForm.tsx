"use client";

import BaseButton from "@/components/common/Button/BaseButton";
import Link from "next/link";
import PasswordInput from "@/components/common/Input/PasswordInput";
import usePasswordResetForm from "./usePasswordResetForm";
import { LogoIcon } from "@/components/common/Icons";

interface PasswordResetFormProps {
  token: string;
}

const PasswordResetForm = ({ token }: PasswordResetFormProps) => {
  const {
    formState,
    errors,
    isLoading,
    handleFormChange,
    handleResetPassword,
  } = usePasswordResetForm(token);

  return (
    <div className="w-full max-w-[430px] border border-violet300 mt-32">
      <div className="flex justify-center items-center pt-8 pb-4 gap-4">
        <div className="flex justify-center items-center gap-4 text-2xl font-semibold text-violet800">
          <LogoIcon />
          <h1>ZARO</h1>
        </div>
      </div>
      <div className="flex flex-col gap-5 px-6 sm:px-12 py-6">
        <form onSubmit={handleResetPassword} className="flex flex-col gap-5">
          <h2 className="text-xl text-gray900 text-center">비밀번호 재설정</h2>
          <h3 className="text-sm text-gray900 text-center leading-loose">
            새로운 비밀번호를 설정하세요.
          </h3>

          <PasswordInput
            placeholder="비밀번호를 입력하세요."
            size="xl"
            value={formState.password}
            onChange={handleFormChange("password")}
            styleState={errors.password ? "invalid" : "default"}
            error={errors.password}
          />
          <PasswordInput
            placeholder="비밀번호 확인"
            size="xl"
            value={formState.passwordConfirm}
            onChange={handleFormChange("passwordConfirm")}
            styleState={errors.passwordConfirm ? "invalid" : "default"}
            error={errors.passwordConfirm}
          />
          <BaseButton
            type="submit"
            color="violet800"
            size="xl"
            isLoading={isLoading}
          >
            확인
          </BaseButton>
          <div className="flex justify-center text-sm text-gray600 font-light">
            <Link
              href="/login"
              className="underline hover:opacity-80 transition"
            >
              로그인으로 돌아가기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetForm;
