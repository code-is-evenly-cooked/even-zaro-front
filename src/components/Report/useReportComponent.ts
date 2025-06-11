import { reportComment, reportPost } from "@/lib/api/report";
import { getErrorMessage } from "@/lib/error/getErrorMessage";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";
import { ReportReason, ReportType } from "@/types/report";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface UseReportComponentProps {
  reportId: string;
  type: ReportType;
}

const useReportComponent = ({ reportId, type }: UseReportComponentProps) => {
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

  const handleChangeReason = (reason: ReportReason) => {
    setSelectedReason(reason);
    if (reason !== ReportReason.ETC) {
      setEtcReason("");
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
      showToastMessage({ type: "error", message: getErrorMessage(error) });
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
        reasonText: etcReason,
      });
      showToastMessage({
        type: "success",
        message: "게시글 신고가 접수되었습니다.",
      });
      router.back();
    } catch (error) {
      showToastMessage({ type: "error", message: getErrorMessage(error) });
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    selectedReason,
    etcReason,
    handleChangeReason,
    setEtcReason,
    handleSubmit,
  };
};

export default useReportComponent;
