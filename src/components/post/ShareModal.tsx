"use client";

import { shareToKakao } from "@/utils/shareToKakao";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";

export default function ShareModal({ onClose }: { onClose: () => void }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const { showToastMessage } = useToastMessageContext();

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

  const handleKakaoShare = () => {
    if (!window.Kakao?.isInitialized()) {
      showToastMessage({
        message: "공유 SDK가 아직 로드되지 않았습니다.",
        type: "error",
      });
      return;
    }

    shareToKakao({
      title: "🔥 핫한 게시물",
      description: "이 글을 공유해보세요!",
      imageUrl: "https://placehold.co/600x400",
      link: url,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-80">
        <h2 className="text-lg font-bold mb-4">공유하기</h2>
        <div className="flex flex-col gap-3">
          <button onClick={handleCopy} className="bg-gray-200 p-2 rounded">
            🔗 URL 복사
          </button>
          <button
            onClick={handleKakaoShare}
            className="bg-yellow-300 p-2 rounded"
          >
            🟡 카카오톡 공유
          </button>
        </div>
        <button className="text-sm text-gray-500 mt-4" onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
