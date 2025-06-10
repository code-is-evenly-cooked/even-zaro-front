import ReportComponent from "@/components/Report/ReportComponent";
import { ReportType } from "@/types/report";

interface ReportPageProps {
  params: Promise<{ reportId: string }>;
  searchParams: Promise<{ type: string }>;
}

const page = async ({ params, searchParams }: ReportPageProps) => {
  const { reportId } = await params;
  const { type } = await searchParams;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <ReportComponent reportId={reportId} type={type as ReportType} />
    </div>
  );
};

export default page;
