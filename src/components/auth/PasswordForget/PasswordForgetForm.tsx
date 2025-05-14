"use client";

import React from "react";
import TextInput from "@/components/common/Input/TextInput";
import BaseButton from "@/components/common/Button/BaseButton";
import useForgotPasswordForm from "./usePasswordForgetForm";
import Link from "next/link";
import { LogoIcon } from "@/components/common/Icons";

const PasswordForgetForm = () => {
  const { email, emailError, isLoading, handleEmailChange, handleSubmit } =
    useForgotPasswordForm();

  return (
    <div className="w-full max-w-[430px] border border-violet300 mt-32">
      <div className="flex justify-center items-center pt-8 pb-4 gap-4">
        <div className="flex justify-center items-center gap-4 text-2xl font-semibold text-violet800">
          <LogoIcon />
          <h1>ZARO</h1>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-6 sm:px-12 py-6">
        <form onSubmit={handleSubmit} className="flex flex-col  gap-5">
          <h2 className="text-xl text-gray900 text-center">비밀번호 재설정</h2>
          <h3 className="text-sm text-gray900 text-center leading-loose">
            가입한 이메일 주소를 입력해주세요
            <br />
            이메일 인증 완료 후 비밀번호를 재설정할 수 있습니다.
          </h3>

          <TextInput
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            size="xl"
          />
          <BaseButton
            type="submit"
            color="violet800"
            size="xl"
            isLoading={isLoading}
          >
            인증 메일 전송
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

export default PasswordForgetForm;
