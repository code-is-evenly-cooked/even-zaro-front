"use client";

import { useRouter } from "next/navigation";
import { LogoIcon } from "../common/Icons";
import BaseButton from "../common/Button/BaseButton";

const WithdrawalCompleteForm = () => {
  const router = useRouter();

  return (
    <div className="w-full max-w-[430px] border border-violet300">
      <div className="flex justify-center items-center pt-8 pb-4 gap-4">
        <div className="flex justify-center items-center gap-4 text-2xl font-semibold text-violet800">
          <LogoIcon />
          <h1>ZARO</h1>
        </div>
      </div>
      <div className="flex flex-col items-center text-center px-6 sm:px-12 py-10 gap-6">
        <h2 className="text-xl font-bold text-gray900">
          탈퇴가 완료되었습니다.
        </h2>
        <p className="text-md text-gray600 mb-10">
          그동안 ZARO를 이용해주셔서 진심으로 감사합니다.
        </p>
        <BaseButton
          type="button"
          size="xl"
          color="violet800"
          className="w-full"
          onClick={() => router.replace("/")}
        >
          홈으로 가기
        </BaseButton>
      </div>
    </div>
  );
};

export default WithdrawalCompleteForm;
