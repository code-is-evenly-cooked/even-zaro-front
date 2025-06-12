"use client";

import { useState, useRef, useEffect } from "react";
import type { FavoriteItemType } from "@/types/favorite";
import { MoreVerticalIcon } from "lucide-react";
import { updateFavoriteItem, deleteFavoriteItem } from "@/lib/api/favorite";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface Props {
  item: FavoriteItemType;
  onDelete?: (itemId: number) => void;
}

export default function FavoriteItemCard({ item, onDelete }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMemo, setEditedMemo] = useState(item.memo);
  const [displayMemo, setDisplayMemo] = useState(item.memo);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 수정 모드 시 input 포커스
  useEffect(() => {
    if (isEditing) inputRef.current?.focus();
  }, [isEditing]);

  const handleEditComplete = async () => {
    try {
      await updateFavoriteItem(item.id, editedMemo);
      setDisplayMemo(editedMemo);
      setIsEditing(false);
    } catch (e) {
      console.error("메모 수정 실패", e);
      alert("수정에 실패했습니다.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFavoriteItem(item.id);
      onDelete?.(item.id); // 부모에서 displayItems 갱신
    } catch (e) {
      console.error("삭제 실패", e);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <li className="p-4 border rounded-md shadow-sm relative">
      <div className="flex justify-between">
        <div className="font-semibold">
          {item.placeName}
          <span className="font-normal text-gray600 ml-4">{item.address}</span>
        </div>

        <button
          className="text-gray600 hover:text-black"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          ref={buttonRef}
        >
          <MoreVerticalIcon width={20} height={20} />
        </button>

        {isMenuOpen && (
          <div
            ref={menuRef}
            className="absolute right-2 top-10 w-24 bg-white rounded-lg shadow-lg z-10"
          >
            <button
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray100"
              onClick={() => {
                setIsEditing(true);
                setIsMenuOpen(false);
              }}
            >
              메모 수정
            </button>
            <button
              className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray100"
              onClick={() => {
                setIsMenuOpen(false);
                setIsDeleteModalOpen(true);
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <input
          ref={inputRef}
          value={editedMemo}
          onChange={(e) => setEditedMemo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleEditComplete();
            if (e.key === "Escape") {
              setIsEditing(false);
              setEditedMemo(displayMemo);
            }
          }}
          className="mt-2 text-sm px-2 py-1 rounded border border-gray300 w-full"
        />
      ) : (
        <p className="text-sm text-gray600 mt-2">{displayMemo}</p>
      )}

      {/* 삭제 확인 모달 */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="장소를 삭제할까요?"
        description="삭제하면 이 장소는 더 이상 그룹에 표시되지 않습니다."
      />
    </li>
  );
}
