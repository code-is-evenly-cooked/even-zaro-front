import { REPORT_REASON_LABEL, ReportReason } from "@/types/report";

const ReportSelector = () => {
  return (
    <div>
      <li className="flex flex-col space-y-4 px-4">
        {Object.values(ReportReason).map((reason) => (
          <label key={reason} className="flex gap-4">
            <input
              type="radio"
              name="reportReason"
              value={reason}
              className="accent-violet600"
            />
            <span className="text-xl">{REPORT_REASON_LABEL[reason]}</span>
          </label>
        ))}
      </li>
    </div>
  );
};

export default ReportSelector;
