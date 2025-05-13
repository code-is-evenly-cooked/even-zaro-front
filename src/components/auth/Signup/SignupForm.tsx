"use client";

import BaseButton from "@/components/common/Button/BaseButton";
import PasswordInput from "@/components/common/Input/PasswordInput";
import TextInput from "@/components/common/Input/TextInput";
import Link from "next/link";
import React from "react";
import useSignupForm from "./useSignupForm";
import AgreementList from "@/components/common/Agreement/AgreementList";
import { LogoIcon } from "@/components/common/Icons";

const SignupForm = () => {
  const {
    formState,
    agreements,
    errors,
    isLoading,
    handleFormChange,
    handleAgreementToggle,
    handleSignup,
  } = useSignupForm();

  return (
    <div className="w-full max-w-[430px] border border-violet300 mt-32">
      <div className="flex justify-center items-center pt-8 pb-4 gap-4">
        <div className="flex justify-center items-center gap-4 text-2xl font-semibold text-violet800">
          <LogoIcon />
          <h1>ZARO</h1>
        </div>
      </div>
      <div className="flex flex-col gap-5 px-6 sm:px-10 py-6">
        {/* 회원가입 */}
        <form className="flex flex-col gap-5" onSubmit={handleSignup}>
          <div className="flex flex-col gap-2">
            <TextInput
              placeholder="이메일을 입력하세요"
              size="xl"
              value={formState.email}
              onChange={handleFormChange("email")}
              styleState={errors.email ? "invalid" : "default"}
              error={errors.email}
            />
            <PasswordInput
              placeholder="비밀번호를 입력하세요"
              size="xl"
              value={formState.password}
              onChange={handleFormChange("password")}
              styleState={errors.password ? "invalid" : "default"}
              error={errors.password}
            />
            <PasswordInput
              placeholder="비밀번호 확인"
              size="xl"
              value={formState.confirmPassword}
              onChange={handleFormChange("confirmPassword")}
              styleState={errors.confirmPassword ? "invalid" : "default"}
              error={errors.confirmPassword}
            />
            <TextInput
              placeholder="닉네임을 입력하세요"
              size="xl"
              value={formState.nickname}
              onChange={handleFormChange("nickname")}
              styleState={errors.nickname ? "invalid" : "default"}
              error={errors.nickname}
            />
          </div>
          <div className="flex flex-col"></div>
          <AgreementList
            agreements={agreements}
            onToggle={handleAgreementToggle}
          />
          <BaseButton
            type="submit"
            size="xl"
            color="violet800"
            isLoading={isLoading}
          >
            회원가입
          </BaseButton>
        </form>
        <div className="flex justify-center text-sm text-gray600 font-light">
          <Link href="/login" className="underline hover:opacity-20 transition">
            로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
