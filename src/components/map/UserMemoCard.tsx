
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
    <div className="flex items-center">
      {/* 이미지 영역 */}
      <div className="flex items-center justify-center rounded-full w-10 h-10 border-2 border-gray200">
        <img src={profileImage} className="rounded-full w-10 border-1 border-gray200"/>
      </div>
      <div className="flex-1 p-3 shadow-sm hover:bg-gray-100 transition">
        <h3 className="font-bold text-base ">{nickName}</h3>
        <p className="text-sm text-gray600">{memo}</p>
      </div>
    </div>
  );
}