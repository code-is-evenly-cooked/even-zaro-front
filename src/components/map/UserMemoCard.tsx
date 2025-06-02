import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";

interface UserMemoProps {
  profileImage : string;
  nickName : string;
  memo : string;
}

export default function UserMemoCard({
  profileImage,
  nickName,
  memo
} : UserMemoProps) {
  return (
    <li className="flex items-center hover:bg-gray100 transition p-1">
      {/* 이미지 영역 */}
      <button className="flex items-center justify-center rounded-full w-10 h-10 border-2 border-gray200">
        <Image src={getProfileImageUrl(profileImage)}
               alt="프로필 이미지"
               width={28}
               height={28}
               className="rounded-full w-10 h-10 border-1 border-gray200 flex-shrink-0"
        />

        {/*<img src={profileImage} className="rounded-full w-10 h-10 border-1 border-gray200 flex-shrink-0"/>*/}
      </button>
      <div className="items-center flex p-3 shadow-sm space-x-3">
        <span className="font-bold text-base flex-shrink-0">{nickName}</span>
        <span className="text-gray600">{memo}</span>
      </div>
    </li>
  );
}