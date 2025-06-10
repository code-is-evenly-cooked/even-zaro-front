import { REPORT_REASON_LABEL, ReportReason } from "@/types/report";

interface ReportSelectorProps {
  selected: ReportReason | null;
  etcReason: string;
  onChangeReason: (reason: ReportReason) => void;
  onChangeEtcReason: (reason: string) => void;
}

const ReportSelector = ({
  selected: selectedReason,
  etcReason,
  onChangeReason,
  onChangeEtcReason,
}: ReportSelectorProps) => {
  return (
    <div>
      <li className="flex flex-col space-y-4 px-4 py-2">
        {Object.values(ReportReason).map((reason) => (
          <label key={reason} className="flex gap-4">
            <input
              type="radio"
              name="reportReason"
              value={reason}
              checked={selectedReason === reason}
              onChange={() => onChangeReason(reason)}
              className="accent-violet600"
            />
            <span className="text-xl">{REPORT_REASON_LABEL[reason]}</span>
          </label>
        ))}
      </li>
      {selectedReason === ReportReason.ETC && (
        <textarea
          value={etcReason}
          onChange={(e) => onChangeEtcReason(e.target.value)}
          placeholder="기타 사유를 입력해주세요."
          className="w-full h-24 p-3 m-4 bg-gray100 rounded-b-xl overflow-y-auto resize-none focus:outline-none
          focus:ring-0 text-md"
        />
      )}
    </div>
  );
};

export default ReportSelector;
