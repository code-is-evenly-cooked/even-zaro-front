import { getProfileImageUrl } from "@/utils/image";
import Image from "next/image";

interface PostAuthorProps {
  nickname: string;
  profileImage: string | null;
}

export default function PostAuthor({
  nickname,
  profileImage: profileImage,
}: PostAuthorProps) {
  return (
    <div className="flex items-center justify-between my-3 py-4 border-b border-gray200">
      <div className="flex items-center gap-4">
        <Image
          src={getProfileImageUrl(profileImage)}
          alt="프로필 이미지"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <span className="font-medium text-gray900">{nickname}</span>
      </div>

      <button className="text-sm px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600">
        팔로우
      </button>
    </div>
  );
}
