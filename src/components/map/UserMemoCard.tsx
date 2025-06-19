import Image from "next/image";
import { getProfileImageUrl } from "@/utils/image";
import Link from "next/link";
import { useMapPageStore } from "@/stores/map/useMapPageStore";

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
  const { setPageGroupList } = useMapPageStore();

  return (
    <li className="flex items-center justify-center gap-3 w-full hover:bg-gray100 transition p-2">
      {/* 프로필 이미지 */}
      <Link
        href={`/profile/${userId}`}
        className="flex flex-shrink-0 w-11 h-11 border-2 border-gray200 rounded-full overflow-hidden"
      >
        <Image
          src={getProfileImageUrl(profileImage)}
          alt="프로필 이미지"
          width={44}
          height={44}
          className="rounded-full object-cover aspect-square w-full h-full"
        />
      </Link>

      {/* 닉네임 + 메모 */}
      <div className="flex flex-col w-full">
        <button
          onClick={() => setPageGroupList(userId)}
          className="font-bold text-base text-gray900 hover:underline text-left break-words p-1"
        >
          {nickName}
        </button>
        <div className="mt-1 bg-white shadow-sm rounded-md p-1">
          <span className="text-gray600 break-words whitespace-pre-line text-sm">
            {memo}
          </span>
        </div>
      </div>
    </li>
  );
}
