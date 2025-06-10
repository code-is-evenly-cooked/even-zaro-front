interface ReportPageProps {
  params: Promise<{ reportId: string }>;
  searchParams: Promise<{ type: string }>;
}

const page = async ({ params, searchParams }: ReportPageProps) => {
  const { reportId } = await params;
  const { type } = await searchParams;

  return <div>{reportId}</div>;
};

export default page;
