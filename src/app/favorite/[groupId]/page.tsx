import FavoritePageClient from "./FavoritePageClient";

interface PageProps {
  params: Promise<{ groupId: string }>;
}

export default async function Page({ params }: PageProps) {
  const { groupId } = await params;
  return <FavoritePageClient groupId={parseInt(groupId)} />;
}
