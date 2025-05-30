
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
        <img src={profileImage} className="rounded-full w-10 h-10 border-1 border-gray200 flex-shrink-0"/>
      </div>
      <div className="items-center flex p-3 shadow-sm hover:bg-gray-100 transition space-x-3">
        <span className="font-bold text-base flex-shrink-0">{nickName}</span>
        <span className="text-gray600">{memo}</span>
      </div>
    </div>
  );
}