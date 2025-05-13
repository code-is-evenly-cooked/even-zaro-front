import Image from "next/image";

interface IconProps {
  className?: string;
}

export const LogoIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/logoIcon.svg"
      alt="로고"
      width={36}
      height={36}
      className={className}
      priority
    />
  );
};

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

export const CloseIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/close.svg"
      alt="닫기"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};
