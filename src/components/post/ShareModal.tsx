"use client";

import { shareToKakao } from "@/utils/shareToKakao";
import { useEffect } from "react";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { KakaoIcon } from "@/components/common/Icons";
import { Link, X } from "lucide-react";

interface ShareModalProps {
  onClose: () => void;
  postTitle: string;
  postThumbnailUrl?: string;
}

export default function ShareModal({
  onClose,
  postTitle,
  postThumbnailUrl,
}: ShareModalProps) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const { showToastMessage } = useToastMessageContext();

  // 모달 열릴 때 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // URL 복사 기능
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      showToastMessage({ message: "URL이 복사되었습니다.", type: "success" });
      onClose();
    } catch {
      showToastMessage({
        message: "URL 복사에 실패하였습니다.",
        type: "error",
      });
    }
  };

  // Kakao 공유 기능
  const handleKakaoShare = () => {
    if (!window.Kakao?.isInitialized()) {
      showToastMessage({
        message: "공유 SDK가 아직 로드되지 않았습니다.",
        type: "error",
      });
      return;
    }

    // title 길이 제한
    const getShareTitle = (title: string) => {
      if (title.length > 50) return `📌 ${title.slice(0, 50)}...`;
      return `📌 ${title}`;
    };

    // 썸네일 없으면 기본 이미지 사용
    const fallbackImageUrl = "/default-share-thumbnail.png";

    const imageUrl = postThumbnailUrl
      ? (postThumbnailUrl.startsWith("http")
          ? postThumbnailUrl
          : `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${postThumbnailUrl}`)
      : fallbackImageUrl;

    shareToKakao({
      title: getShareTitle(postTitle),
      description: "Zaro에서 공유한 게시글입니다. 지금 확인해보세요!",
      imageUrl,
      link: url,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-80 bg-white p-4 rounded-xl shadow">
        {/* 닫기 X 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={20} className="text-gray900 hover:text-gray900/80" />
        </button>

        <h2 className="text-lg font-bold mb-2 text-center">공유하기</h2>
        <div className="flex flex-col gap-2">
          <button
            onClick={handleCopy}
            className="relative flex justify-center items-center p-2 bg-gray200 hover:bg-gray200/80 rounded-lg font-bold text-gray900"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <Link />
            </span>
            <span>URL 복사</span>
          </button>
          <button
            onClick={handleKakaoShare}
            className="relative flex justify-center items-center p-2 bg-kakao hover:bg-kakao/80 rounded-lg font-bold text-gray900"
          >
            <span className="absolute left-4 top-1/2 -translate-y-1/2">
              <KakaoIcon />
            </span>
            <span>카카오톡 공유</span>
          </button>
        </div>
      </div>
    </div>
  );
}
