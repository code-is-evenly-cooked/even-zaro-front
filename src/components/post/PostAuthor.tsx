"use client";

import { getProfileImageUrl } from "@/utils/image";
import { useAuthStore } from "@/stores/useAuthStore";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { fetchFollowings, followUser, unfollowUser } from "@/lib/api/follow";
import { MoreVerticalIcon } from "lucide-react";
import { deletePost } from "@/lib/api/post.client";
import { useRouter } from "next/navigation";
import ConfirmDeleteModal from "@/components/Favorite/ConfirmDeleteModal";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { getDdayLabel } from "@/utils/date";
import Link from "next/link";
import LoadingSpinner from "../common/LoadingSpinner/LoadingSpinner";

interface PostAuthorProps {
  postId: number;
  category: string;
  nickname: string;
  profileImage: string | null;
  liveAloneDate: string | null;
  authorUserId: number;
}

export default function PostAuthor({
  postId,
  category,
  nickname,
  profileImage,
  liveAloneDate,
  authorUserId,
  following,
}: PostAuthorProps) {
  const currentUserId = useAuthStore((state) => state.user?.userId);
  const [isFollowing, setIsFollowing] = useState(following);
  const [isLoading, setIsLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { showToastMessage } = useToastMessageContext();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const isMine = currentUserId === authorUserId;

  const handleToggleFollow = async () => {
    if (isLoading) return;

    const prev = isFollowing;
    setIsFollowing(!prev);
    setIsLoading(true);

    try {
      if (prev) {
        await unfollowUser(authorUserId);
      } else {
        await followUser(authorUserId);
      }
    } catch (e) {
      console.error("❌ 팔로우 토글 실패", e);
      setIsFollowing(prev); // 실패 시 롤백
    } finally {
      setIsLoading(false);
    }
  };

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 게시글 수정
  const handleEdit = () => {
    router.push(`/editor?postId=${postId}&category=${category}`);
  };

  // 게시글 삭제
  const handleDelete = async () => {
    try {
      await deletePost(postId);
      showToastMessage({
        message: "게시글 삭제에 성공했습니다.",
        type: "success",
      });
      router.replace(`/board/${category}`);
    } catch (e) {
      console.error("게시글 삭제 실패:", e);
      showToastMessage({
        message: "게시글 삭제에 실패했습니다.",
        type: "error",
      });
    }
  };

  return (
    <div className="flex items-center justify-between my-3 py-4 border-b border-gray200">
      <Link
        href={`/profile/${authorUserId}`}
        className="flex items-center gap-4"
      >
        <Image
          src={getProfileImageUrl(profileImage)}
          alt="프로필 이미지"
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <span className="font-medium text-gray900">{nickname}</span>

        <div className="text-sm text-gray600">
          {getDdayLabel(liveAloneDate)}
        </div>
      </Link>

      {/* 팔로우 버튼 */}
      <div className="flex items-center gap-2">
        {!isMine && (
          <div className="min-w-[90px] ">
            <button
              onClick={handleToggleFollow}
              disabled={isLoading}
              className={`flex items-center justify-center text-sm px-4 py-1.5 rounded-3xl transition-all duration-300 w-full font-semibold ${
                isFollowing
                  ? "bg-gray200 text-gray900 hover:bg-opacity-70"
                  : "bg-violet300 text-gray900 hover:bg-opacity-70"
              }`}
            >
              {isLoading ? (
                <LoadingSpinner />
              ) : isFollowing ? (
                "팔로잉"
              ) : (
                "팔로우"
              )}
            </button>
          </div>
        )}

      {/* 메뉴 모달 */}
      {isMine && (
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            <MoreVerticalIcon width={20} height={20} className="text-gray600" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white border border-gray200 rounded shadow-md z-10">
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray100"
                onClick={handleEdit}
              >
                수정
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-gray100"
                onClick={() => {
                  setMenuOpen(false);
                  setIsDeleteModalOpen(true);
                }}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      )}
      {/* 삭제 확인 모달 */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="게시글을 삭제할까요?"
        description="삭제하면 이 글은 복구할 수 없습니다."
      />
    </div>
  );
}
