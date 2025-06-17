import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";
import { useMapStore } from "@/stores/mapStore";
import Link from "next/link";

interface UserMemoProps {
  userId: number;
  profileImage: string;
  nickName: string;
  memo: string;
}

export default function UserMemoCard({
  userId,
  profileImage,
  nickName,
  memo,
}: UserMemoProps) {
  const { setPageGroupList } = useMapStore();

  return (
    <li className="flex items-center hover:bg-gray100 transition p-1">
      {/* 이미지 영역 */}
      <Link
        href={`/profile/${userId}`}
        className="flex items-center justify-center rounded-full w-11 h-11 border-2 border-gray200"
      >
        <Image
          src={getProfileImageUrl(profileImage)}
          alt="프로필 이미지"
          width={40}
          height={40}
          className="rounded-full border border-gray200 flex-shrink-0 h-auto"
        />
      </Link>
      <div className="items-center flex p-3 shadow-sm space-x-3">
        <button
          onClick={() => setPageGroupList(userId)}
          className="font-bold text-base flex-shrink-0 text-left text-gray900 hover:underline focus:outline-none"
        >
          {nickName}
        </button>
        <span className="text-gray600">{memo}</span>
      </div>
    </li>
  );
}
