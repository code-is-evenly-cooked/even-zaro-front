import PostListCard from "@/components/common/SectionCards/PostListCard";
import PostListComponent from "@/components/PostList/PostListComponent";
import { MainCategory } from "@/types/category";
import { PostDetailItem } from "@/types/post";
import { isMainCategory } from "@/utils/category";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ category: string }>;
}

const mockPost: PostDetailItem[] = [
  {
    postId: 1,
    title: "결국 샀습니다",
    content:
      "언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂",
    thumbnailImage:
      "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
    category: "TOGETHER",
    tag: "SHARING",
    likeCount: 12,
    commentCount: 4,
    imageUrlList: [],
    createdAt: "2025-05-23T10:15:30",
    user: {
      userId: 1,
      nickname: "자취생123",
      profileImage: "https://via.placeholder.com/40x40.png?text=유저",
    },
  },
];

export default async function PostListPage({ params }: PageProps) {
  const { category } = await params;

  if (!isMainCategory(category)) {
    notFound();
  }

  const categoryKey = category as MainCategory;
  return (
    <div className="w-full max-w-3xl mx-auto">
      <PostListComponent category={categoryKey} />
      <div className="flex flex-col pr-10 pl-3">
        {mockPost.map((post) => (
          <Link href={`/board/${category}/${post.postId}`} key={post.postId}>
            <PostListCard key={post.postId} post={post} />
          </Link>
        ))}
      </div>
    </div>
  );
}
