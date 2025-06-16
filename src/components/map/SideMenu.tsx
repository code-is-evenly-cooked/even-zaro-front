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

            <Link href="/">
              <li className="relative group">
                <button>
                  <HomeIcon className="w-10 h-10" />
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    홈
                  </div>
                </button>
              </li>
            </Link>
            <Link href="/board/TOGETHER">
              <li className="relative group">
                <button>
                  <TogetherIcon className="w-10 h-10" />
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    같이 쓰자
                  </div>
                </button>
              </li>
            </Link>

            <Link href="/board/DAILY_LIFE">
              <li className="relative group">
                <button>
                  <TipIcon className="w-10 h-10" />
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    자취 일상
                  </div>
                </button>
              </li>
            </Link>
            <Link href="/board/RANDOM_BUY">
              <li className="relative group">
                <button>
                  <ShoppingBagIcon className="w-10 h-10" />
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    텅장 일기
                  </div>
                </button>
              </li>
            </Link>
            <Link href={`/profile/${userId}`}>
              <li className="relative group">
                <button>
                  <DefaultProfileIcon className="w-10 h-10 rounded-full object-cover" />
                  <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    내 프로필
                  </div>
                </button>
              </li>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
}
