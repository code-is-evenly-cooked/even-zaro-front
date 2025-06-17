"use client";

import BaseButton from "@/components/common/Button/BaseButton";
import { InfoIcon } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 gap-6">
      <h1 className="text-2xl font-bold text-gray900 flex flex-col items-center gap-4">
        <span className="text-6xl">
          <InfoIcon size={80} />
        </span>
        존재하지않거나 탈퇴한 회원입니다.
      </h1>
      <BaseButton color="violet800" size="xl" onClick={handleGoBack}>
        뒤로 가기
      </BaseButton>
    </div>
  );
};

export default NotFoundPage;
