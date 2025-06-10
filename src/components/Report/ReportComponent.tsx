"use client";
import { ReportReason, ReportType } from "@/types/report";
import BaseButton from "../common/Button/BaseButton";
import ReportSelector from "./ReportSelector";
import { useState } from "react";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { reportComment, reportPost } from "@/lib/api/report";
import { useRouter } from "next/navigation";

interface ReportComponentProps {
  reportId: string;
  type: ReportType;
}

const ReportComponent = ({ reportId, type }: ReportComponentProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(
    null,
  );
  const [etcReason, setEtcReason] = useState("");

  const { showToastMessage } = useToastMessageContext();

  const handleSubmit = () => {
    if (selectedReason === ReportReason.ETC && etcReason.trim() === "") {
      showToastMessage({
        type: "info",
        message: "기타 사유에 대해 간단히 설명해주세요.",
      });
      return;
    }

    if (type === "COMMENT") {
      handleComemntReport();
    }
    if (type === "POST") {
      handlePostReport();
    }
  };

  const handleComemntReport = async () => {
    setIsLoading(true);
    try {
      await reportComment({
        id: reportId,
        reasonType: selectedReason as string,
        reasonText: selectedReason === ReportReason.ETC ? etcReason : "",
      });
      showToastMessage({
        type: "success",
        message: "댓글 신고가 접수되었습니다.",
      });
      router.back();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "오류가 발생했습니다.";
      showToastMessage({ type: "error", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePostReport = async () => {
    setIsLoading(true);
    try {
      await reportPost({
        id: reportId,
        reasonType: selectedReason as string,
        reasonText: selectedReason === ReportReason.ETC ? etcReason : "",
      });
      showToastMessage({
        type: "success",
        message: "게시글 신고가 접수되었습니다.",
      });
      router.back();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "오류가 발생했습니다.";
      showToastMessage({ type: "error", message: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">신고 하기</h1>
        <h2>신고 사유를 선택해주세요.</h2>
      </div>
      <ReportSelector
        selected={selectedReason}
        etcReason={etcReason}
        onChangeReason={setSelectedReason}
        onChangeEtcReason={setEtcReason}
      />
      <BaseButton
        color="violet800"
        size="xl"
        className="items-center mx-auto w-6/12 min-w-20"
        disabled={!selectedReason}
        isLoading={isLoading}
        onClick={handleSubmit}
      >
        신고하기
      </BaseButton>
    </div>
  );
};

export default ReportComponent;
