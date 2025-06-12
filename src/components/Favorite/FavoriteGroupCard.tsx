"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVerticalIcon } from "lucide-react";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import type { FavoriteGroupType } from "@/types/favorite";
import Link from "next/link";
import {
  updateFavoriteGroupName,
  deleteFavoriteGroup,
} from "@/lib/api/favorite";

interface FavoriteGroupProps {
  group: FavoriteGroupType;
  onDelete: (groupId: number) => void;
}

export default function FavoriteGroupCard({
  group,
  onDelete,
}: FavoriteGroupProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(group.name);
  const [displayName, setDisplayName] = useState(group.name);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  // 수정 모드일 때 input 자동 포커스
  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  // 즐겨찾기 그룹 이름 수정
  const handleEditComplete = async () => {
    if (editedName.trim() !== "") {
      try {
        await updateFavoriteGroupName(group.groupId, editedName);
        setDisplayName(editedName);
        setIsEditing(false);
        setIsMenuOpen(false);
      } catch (e) {
        console.error("수정 실패:", e);
        alert("수정에 실패했습니다.");
      }
    }
  };

  // 즐겨찾기 그룹 삭제
  const handleDelete = async () => {
    try {
      await deleteFavoriteGroup(group.groupId);
      onDelete?.(group.groupId); // 부모에서 상태 업데이트
    } catch (e) {
      console.error("삭제 실패:", e);
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <div className="relative bg-gray100 rounded-lg px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <div className="w-6 h-6 bg-violet600 rounded-full text-white flex items-center justify-center text-sm font-bold">
          ★
        </div>
        <div className="flex flex-col">
          {isEditing ? (
            <input
              ref={inputRef}
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditComplete();
                if (e.key === "Escape") {
                  setIsEditing(false);
                  setEditedName(displayName);
                }
              }}
              className="text-sm font-semibold px-2 py-1 rounded bg-white border border-gray300 focus:outline-none"
            />
          ) : (
            <Link
              href={`/favorite/${group.groupId}`}
              className="font-semibold hover:underline"
            >
              {displayName}
            </Link>
          )}
          <span className="text-sm text-gray600">
            장소 {group.groupFavoriteCount}
          </span>
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
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray100 flex items-center gap-2"
            onClick={() => {
              setIsEditing(true);
              setIsMenuOpen(false);
            }}
          >
            수정
          </button>
          <button
            className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray100 flex items-center gap-2"
            onClick={() => {
              setIsMenuOpen(false);
              setIsDeleteModalOpen(true);
            }}
          >
            삭제
          </button>
        </div>
      )}

      {/* 삭제 확인 모달 */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="그룹을 삭제할까요?"
        description="삭제하면 이 그룹은 더 이상 표시되지 않습니다."
      />
    </div>
  );
}
