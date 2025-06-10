"use client";
import { ReportReason, ReportType } from "@/types/report";
import BaseButton from "../common/Button/BaseButton";
import ReportSelector from "./ReportSelector";
import { useState } from "react";

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
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-2xl font-bold">신고 하기</h1>
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
      >
        신고하기
      </BaseButton>
    </div>
  );
};

export default ReportComponent;
