"use client";
import { ReportReason, ReportType } from "@/types/report";
import BaseButton from "../common/Button/BaseButton";
import ReportSelector from "./ReportSelector";
import { useState } from "react";
import { useToastMessageContext } from "@/providers/ToastMessageProvider";

interface ReportComponentProps {
  reportId: string;
  type: ReportType;
}

const ReportComponent = ({ reportId, type }: ReportComponentProps) => {
  console.log(reportId, type);
  const [selectedReason, setSelectedReason] = useState<ReportReason | null>(
    null,
  );
  const [etcReason, setEtcReason] = useState("");

  const { showToastMessage } = useToastMessageContext();

  const handleSubmit = () => {
    if (!selectedReason) {
      showToastMessage({ type: "info", message: "신고 사유를 선택해주세요." });
      return;
    }

    if (selectedReason === ReportReason.ETC && etcReason.trim() === "") {
      showToastMessage({
        type: "info",
        message: "기타 사유에 대해 간단히 설명해주세요.",
      });
      return;
    }

    const payload = {
      reason: selectedReason,
      detail: selectedReason === ReportReason.ETC ? etcReason : null,
    };

    console.log(payload);
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
        onClick={handleSubmit}
      >
        신고하기
      </BaseButton>
    </div>
  );
};

export default ReportComponent;
