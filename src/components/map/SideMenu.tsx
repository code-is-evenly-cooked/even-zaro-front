import { HomeIcon } from "lucide-react";

import {
  DefaultProfileIcon,
  LogoIcon,
  ShoppingBagIcon,
  TipIcon,
  TogetherIcon,
} from "../common/Icons";
import Link from "next/link";
import { useState } from "react";
import { useAuthStore } from "@/stores/useAuthStore";

export default function SideMenu() {
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuthStore();
  const userId = user?.userId ?? null;

  return (
    <div
      className={`flex absolute flex-nowrap w-24 h-auto justify-around p-4 absolute top-0 left-0 z-10  transition-colors duration-300 ${
        openModal ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <ul className="flex flex-col items-center justify-center space-y-6 w-full h-full">
        {/*  메뉴 토글 버튼 */}
        <li onClick={() => setOpenModal(!openModal)} className="cursor-pointer">
          <LogoIcon className="w-16 h-16" />
        </li>

        {openModal && (
          <>
            {/* 회색 구분선 */}
            <li className="w-3/4 border-t border-gray-300 my-2" />

            <li className="relative group">
              <Link href="/">
                  <HomeIcon className="w-10 h-10" />
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    홈
                  </div>
              </Link>
            </li>
            <li className="relative group">
              <Link href="/board/TOGETHER">
                <TogetherIcon className="w-10 h-10" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  같이 쓰자
                </div>
              </Link>
            </li>

            <li className="relative group">
              <Link href="/board/DAILY_LIFE">
                <TipIcon className="w-10 h-10" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  자취 일상
                </div>
              </Link>
            </li>
            <li className="relative group">
              <Link href="/board/RANDOM_BUY">
                <ShoppingBagIcon className="w-10 h-10" />
                <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  텅장 일기
                </div>
              </Link>
            </li>
            <li className="relative group">
              <Link href={`/profile/${userId}`}>
                <DefaultProfileIcon className="w-10 h-10 rounded-full object-cover" />
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
