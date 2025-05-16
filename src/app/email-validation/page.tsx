"use client";
import EmailValidationForm from "@/components/auth/EmailValidation/EmailValidationForm";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const EmailValidationPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="flex justify-center items-center">
      <EmailValidationForm email={email ?? ""} />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense>
      <EmailValidationPage />
    </Suspense>
  );
};
export default Page;
