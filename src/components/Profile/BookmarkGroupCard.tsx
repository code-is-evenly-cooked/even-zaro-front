"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVerticalIcon } from "lucide-react";
import type { BookmarkGroupType } from "@/types/bookmark";

interface BookmarkGroupProps {
  group: BookmarkGroupType;
}

export default function BookmarkGroupCard({ group }: BookmarkGroupProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 외부 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative bg-gray100 rounded-lg px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <div className="w-6 h-6 bg-violet600 rounded-full text-white flex items-center justify-center text-sm font-bold">
          ★
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">{group.name}</span>
          <span className="text-sm text-gray-500">장소 4</span>
        </div>
      </div>

      <button
        className="text-gray600 hover:text-black"
        onClick={() => setIsMenuOpen((prev) => !prev)}
        ref={buttonRef}
      >
        <MoreVerticalIcon width={20} height={20} />
      </button>

      {/* 메뉴 팝업 */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="absolute -right-4 top-1/2 mt-2 w-24 bg-white rounded-lg shadow-lg z-10"
        >
          <button
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 flex items-center gap-2"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            수정
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray-100 flex items-center gap-2"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
