import { LogoIcon } from "@/components/common/Icons";
import LoadingSpinner from "@/components/common/LoadingSpinner/LoadingSpinner";
import { sendEmailValidation } from "@/lib/api/auth";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { useState } from "react";

interface EmailValidationFormProps {
  email: string;
}

const EmailValidationForm = ({ email }: EmailValidationFormProps) => {
  const [isResending, setIsResending] = useState(false);

  const { showToastMessage } = useToastMessageContext();

  const handleResendEmail = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsResending(true);
    try {
      const message = await sendEmailValidation(email);
      showToastMessage({ type: "success", message });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "인증 메일 전송 실패";
      showToastMessage({ type: "error", message: errorMessage });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="w-full max-w-[430px] border border-violet300 mt-32">
      <div className="flex justify-center items-center pt-8 pb-4 gap-4">
        <div className="flex justify-center items-center gap-4 text-2xl font-semibold text-violet800">
          <LogoIcon />
          <h1>ZARO</h1>
        </div>
      </div>
      <div className="flex flex-col gap-5 px-6 sm:px-12 pt-4 pb-10">
        <h2 className="text-xl text-gray900 text-center">이메일 인증</h2>
        <h3 className="text-sm text-gray900 text-center">
          {`인증 메일이 ${email}로 발송되었습니다.`}
          <br />
          이메일을 열고 버튼을 누르면 가입이 완료됩니다.
        </h3>
        {isResending ? (
          <div className="flex justify-center items-center gap-2 text-gray900 text-sm">
            <LoadingSpinner size={16} className="text-violet800" />
            이메일 재전송 중...
          </div>
        ) : (
          <p className="text-sm text-gray900 text-center">
            이메일을 확인할 수 없나요?
            <br />
            {"스팸편지함 확인 또는 "}
            <a
              className="text-violet800 underline font-semibold cursor-pointer"
              onClick={handleResendEmail}
            >
              인증메일 다시 보내기
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailValidationForm;
