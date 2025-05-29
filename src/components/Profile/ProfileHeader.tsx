export default function ProfileHeader() {
  return (
    <div>
      <div className="flex">
        <div>프로필 사진</div>
        <div>
          <div className="flex">
            <div>닉네임</div>
            <span>디데이</span>
            <div>톱니버튼</div>
          </div>
          <div className="flex gap-4">
            <div>글</div>
            <div>팔로잉</div>
            <div>팔로워</div>
          </div>
        </div>
      </div>
    </div>
  );
}
