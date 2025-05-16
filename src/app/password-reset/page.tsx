"use client";

import { Suspense } from "react";

import PasswordResetForm from "@/components/auth/PasswordReset/PasswordResetForm";
import { useSearchParams } from "next/navigation";

const PasswordResetPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token || typeof token !== "string") {
    return <div className="text-center py-10">잘못된 접근입니다.</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <PasswordResetForm token={token} />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense>
      <PasswordResetPage />
    </Suspense>
  );
};

export default Page;
