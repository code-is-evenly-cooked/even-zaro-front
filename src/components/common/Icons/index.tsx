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

export const LogoLineIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/logoWhite.svg"
      alt="홈"
      width={32}
      height={32}
      className={className}
      priority
    />
  );
};

export const SearchIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/searchIcon.svg"
      alt="검색"
      width={20}
      height={20}
      className={className}
      priority
    />
  );
};

export const NotificationIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/notificationIcon.svg"
      alt="알림"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};

export const RightArrowIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/rightArrow.svg"
      alt="검색"
      width={16}
      height={16}
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

export const HomeIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/home.svg"
      alt="홈"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};

export const TogetherIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/together.svg"
      alt="같이 쓰자"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};

export const TipIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/tip.svg"
      alt="자취 꿀팁"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};

export const ShoppingBagIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/shoppingBag.svg"
      alt="텅장 일기"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};

export const LocationIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/map.svg"
      alt="동네 탐방"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};

export const DefaultProfileIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/defaultProfile.svg"
      alt="기본 유저 프로필"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};

export const SettingIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/setting.svg"
      alt="기본 유저 프로필"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};

export const ShareIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/share.svg"
      alt="기본 유저 프로필"
      width={24}
      height={24}
      className={className}
      priority
    />
  );
};

export const RankUpIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/popularup.svg"
      alt="인기 게시글"
      width={14}
      height={14}
      className={className}
      priority
    />
  );
};

export const RankDownIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/populardown.svg"
      alt="인기 게시글"
      width={14}
      height={14}
      className={className}
      priority
    />
  );
};

export const MyLocationIcon = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/mylocation.svg"
      alt="인기 게시글"
      width={36}
      height={36}
      className={className}
      priority
    />
  );
};

export const OpenArrow = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/openArrow.svg"
      alt="모달 열기"
      width={36}
      height={36}
      className={className}
      priority
    />
  );
};

export const CloseArrow = ({ className }: IconProps) => {
  return (
    <Image
      src="/icons/closeArrow.svg"
      alt="모달 닫기"
      width={36}
      height={36}
      className={className}
      priority
    />
  );
};
