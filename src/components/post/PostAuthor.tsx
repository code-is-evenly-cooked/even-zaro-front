interface PostAuthorProps {
  nickname: string;
  profileImageUrl: string;
}

export default function PostAuthor({
  nickname,
  profileImageUrl,
}: PostAuthorProps) {
  return (
    <div className="flex items-center justify-between my-3 py-3 border-b border-gray-600">
      <div className="flex items-center gap-3">
        <img
          src={profileImageUrl}
          alt="프로필"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="font-medium text-gray-800">{nickname}</span>
      </div>

      <button className="text-sm px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600">
        팔로우
      </button>
    </div>
  );
}
