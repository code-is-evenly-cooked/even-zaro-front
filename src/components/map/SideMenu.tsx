import { HomeIcon } from "lucide-react";

import {
  LogoIcon,
  ShoppingBagIcon,
  TipIcon,
  TogetherIcon,
} from "../common/Icons";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { getProfileImageUrl } from "@/utils/image";
import Image from "next/image";

export default function SideMenu() {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuthStore();
  const userId = user?.userId ?? null;
  const userProfileImage = user?.profileImage ?? null;

  return (
    <div
      className={`flex fixed flex-nowrap w-18 h-96 justify-around p-2 top-0 left-0 z-10 rounded-2xl  transition-colors duration-300 ${
        openModal ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <ul className="flex flex-col items-center justify-between w-full h-full py-2">
        {/*  메뉴 토글 버튼 */}
        <li onClick={() => setOpenModal(!openModal)} className="cursor-pointer">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white border border-gray-300 shadow p-1">
            <LogoIcon className="w-full h-full text-gray-800" />
          </div>
        </li>

        {openModal && (
          <>
            {/* 회색 구분선 */}
            <li className="w-3/4 border-t border-gray-300 my-2" />

            <li className="relative group">
              <Link href="/">
                <HomeIcon className="w-8 h-8" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  홈
                </div>
              </Link>
            </li>
            <li className="relative group">
              <Link href="/board/TOGETHER">
                <TogetherIcon className="w-8 h-8" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  같이 쓰자
                </div>
              </Link>
            </li>

            <li className="relative group">
              <Link href="/board/DAILY_LIFE">
                <TipIcon className="w-8 h-8" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  자취 일상
                </div>
              </Link>
            </li>
            <li className="relative group">
              <Link href="/board/RANDOM_BUY">
                <ShoppingBagIcon className="w-8 h-8" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  텅장 일기
                </div>
              </Link>
            </li>
            <li className="relative group">
              <Link href={`/profile/${userId}`}>
                <Image
                  src={getProfileImageUrl(userProfileImage)}
                  alt="프로필 이미지"
                  width={32}
                  height={32}
                  className="rounded-full border border-gray200 flex-shrink-0 h-auto aspect-square"
                />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  내 프로필
                </div>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
