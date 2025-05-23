import PostListComponent from "@/components/PostList/PostListComponent";
import { MainCategory } from "@/types/category";
import { isMainCategory } from "@/utils/category";
import { notFound } from "next/navigation";

interface PageProps {
  params: { category: string };
}

export default async function PostListPage({ params }: PageProps) {
  const { category } = params;

  if (!isMainCategory(category)) {
    notFound();
  }

  const categoryKey = category as MainCategory;
  return <PostListComponent category={categoryKey} />;
}
