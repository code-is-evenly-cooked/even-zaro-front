import Image from "next/image";

interface IconProps {
  className?: string;
}

export const EyeIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/eyeOpen.svg"
      alt="비밀번호 보기"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};

export const EyeCloseIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/eyeClose.svg"
      alt="비밀번호 숨기기"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};

export const KakaoIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/kakao.svg"
      alt="카카오 로그인"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};
