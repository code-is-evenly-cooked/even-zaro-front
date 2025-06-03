import FavoritePageClient from "./FavoritePageClient";

export default function Page({ params }: { params: { groupId: string } }) {
  return <FavoritePageClient groupId={parseInt(params.groupId)} />;
}