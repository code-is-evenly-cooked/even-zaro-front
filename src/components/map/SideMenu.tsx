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

export default function SideMenu() {
  const [openModal, setOpenModal] = useState(true);

  return (
    <div
      className={`flex flex-nowrap w-24 h-auto justify-around p-4 absolute top-0 left-0 z-10 shadow-md transition-colors duration-300 ${
        openModal ? "bg-white" : "bg-transparent"
      }`}
    >
      <ul className="flex flex-col items-center justify-center space-y-6 w-full h-full">
        {/*  메뉴 토글 버튼 (LogoIcon) */}
        <li onClick={() => setOpenModal(!openModal)} className="cursor-pointer">
          <LogoIcon className="w-16 h-16" />
        </li>

        {openModal && (
          <>
            {/* 🔽 회색 구분선 */}
            <li className="w-3/4 border-t border-gray-300 my-2" />

            <Link href="/">
              <li>
                <HomeIcon className="w-10 h-10" />
              </li>
            </Link>
            <li>
              <TogetherIcon className="w-10 h-10" />
            </li>
            <li>
              <TipIcon className="w-10 h-10" />
            </li>
            <li>
              <ShoppingBagIcon className="w-10 h-10" />
            </li>
            <li>
              <DefaultProfileIcon className="w-10 h-10 rounded-full object-cover" />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
