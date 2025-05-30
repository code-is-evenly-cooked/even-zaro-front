import { SampleProfile } from "@/components/common/Icons";

export default function UserMemoCard() {
  return (
    <div className="flex items-center">
      {/* 이미지 영역 */}
      <div className="flex items-center justify-center rounded-full w-10 h-10 border-2 border-gray200">
        <SampleProfile className="rounded-full w-10 border-1 border-gray200" />
      </div>
      <div className="flex-1 p-3 shadow-sm hover:bg-gray-100 transition">
        <h3 className="font-bold text-base ">이브니</h3>
        <p className="text-sm text-gray600">진짜 한강 이남 스시 제일 맛있음.</p>
      </div>
    </div>
  );
}