"use client";

export default function ProfileHeaderSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-20 py-8 animate-pulse">
      <div className="flex gap-6 items-center justify-center">
        {/* 프로필 이미지 스켈레톤 */}
        <div className="w-[80px] h-[80px] rounded-full bg-gray-300 m-6" />

        {/* 텍스트 영역 */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="flex items-center gap-4">
            <div className="w-24 h-6 bg-gray-300 rounded" />
            <div className="w-12 h-4 bg-gray-300 rounded" />
            <div className="w-6 h-6 bg-gray-300 rounded-full" />
          </div>

          <ul className="flex justify-around gap-20">
            <SkeletonStat />
            <SkeletonStat />
            <SkeletonStat />
          </ul>
        </div>
      </div>
    </div>
  );
}

const SkeletonStat = () => (
  <li className="flex items-center gap-1">
    <div className="w-12 h-4 bg-gray-300 rounded" />
    <div className="w-8 h-4 bg-gray200 rounded" />
  </li>
);
