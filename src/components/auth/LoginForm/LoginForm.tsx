"use client";

import React from "react";
import TextInput from "../../common/Input/TextInput";
import BaseButton from "../../common/Button/BaseButton";
import PasswordInput from "../../common/Input/PasswordInput";
import Link from "next/link";
import useLoginForm from "./useLoginForm";
import { LogoIcon } from "@/components/common/Icons";
import KakaoLoginButton from "../Signup/KakaoLoginButton";

const LoginForm = () => {
  const {
    formState,
    errors,
    isLoading,
    handleFormChange,
    handleLogin,
    handleSignup,
    handleKakaoLogin,
  } = useLoginForm();

  return (
    <div className="w-full max-w-[430px] border border-violet300 mt-32">
      <div className="flex justify-center items-center pt-8 pb-4 gap-4">
        <div className="flex justify-center items-center gap-4 text-2xl font-semibold text-violet800">
          <LogoIcon />
          <h1>ZARO</h1>
        </div>
      </div>
      <div className="flex flex-col gap-5 px-6 sm:px-12 py-6">
        {/* 로그인 */}
        <div className="flex flex-col gap-1.5">
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
            </div>

            <BaseButton
              type="submit"
              size="xl"
              color="violet800"
              isLoading={isLoading.email}
            >
              로그인
            </BaseButton>
          </form>

          {/* 회원가입 */}
          <BaseButton
            type="button"
            size="xl"
            color="violet800"
            variant="outlined"
            onClick={handleSignup}
          >
            회원가입
          </BaseButton>
        </div>

        {/* 비밀번호 재설정 */}
        <div className="flex justify-center text-sm text-gray600 font-light">
          <Link
            href="/forgot-password"
            className="underline hover:opacity-80 transition"
          >
            비밀번호 재설정
          </Link>
        </div>

        {/* 또는 구분선 */}
        <div className="flex items-center w-full text-gray600">
          <div className="flex-1 h-px bg-gray200" />
          <span className="px-4 text-sm leading-none">또는</span>
          <div className="flex-1 h-px bg-gray200" />
        </div>

        {/* 소셜 로그인 */}
        <div className="flex flex-col gap-2">
          <KakaoLoginButton
            isLoading={isLoading.kakao}
            onClick={handleKakaoLogin}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
