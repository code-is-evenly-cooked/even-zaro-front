interface ReportPageProps {
  params: Promise<{ reportId: string }>;
}

const page = async ({ params }: ReportPageProps) => {
  const { reportId } = await params;

  return <div>{reportId}</div>;
};

export default page;
