import Image from "next/image";

interface IconProps {
  className?: string;
}

export const Food = ({ className }: IconProps) => {
  return (
    <Image
      src="/placeCategory/food.svg"
      alt="음식"
      width={36}
      height={36}
      className={className}
      priority
    />
  );
};

export const Cafe = ({ className }: IconProps) => {
  return (
    <Image
      src="/placeCategory/cafe.svg"
      alt="카페"
      width={32}
      height={32}
      className={className}
      priority
    />
  );
};


export const Etc = ({ className }: IconProps) => {
  return (
    <Image
      src="/placeCategory/etc.svg"
      alt="기타"
      width={32}
      height={32}
      className={className}
      priority
    />
  );
};

export const Favorite = ({ className }: IconProps) => {
  return (
    <Image
      src="/placeCategory/heart.svg"
      alt="즐겨찾기한 장소"
      width={32}
      height={32}
      className={className}
      priority
    />
  );
};

export const Market = ({ className }: IconProps) => {
  return (
    <Image
      src="/placeCategory/market.svg"
      alt="즐겨찾기한 장소"
      width={32}
      height={32}
      className={className}
      priority
    />
  );
};
