"use client";

import { ReportType } from "@/types/report";
import BaseButton from "../common/Button/BaseButton";
import ReportSelector from "./ReportSelector";
import useReportComponent from "./useReportComponent";

interface ReportComponentProps {
  reportId: string;
  type: ReportType;
}

const ReportComponent = ({ reportId, type }: ReportComponentProps) => {
  const {
    isLoading,
    selectedReason,
    etcReason,
    handleChangeReason,
    setEtcReason,
    handleSubmit,
  } = useReportComponent({ reportId, type });

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">신고 하기</h1>
        <h2>신고 사유를 선택해주세요.</h2>
      </div>
      <ReportSelector
        selected={selectedReason}
        etcReason={etcReason}
        onChangeReason={handleChangeReason}
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
