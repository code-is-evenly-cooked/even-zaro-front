import PostImageCard from "@/components/common/SectionCards/PostImageCard";
import PostListCard from "@/components/common/SectionCards/PostListCard";
import PostListComponent from "@/components/PostList/PostListComponent";
import { convertDetailToImagePostItem } from "@/lib/adapters/normalizePost";
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
    postImageList: [],
    createdAt: "2025-05-23T10:15:30",
    user: {
      userId: 1,
      nickname: "자취생123",
      profileImage: "",
    },
  },
  {
    postId: 2,
    title: "결국 샀습니다",
    content:
      "언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂",
    thumbnailImage:
      "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
    category: "TOGETHER",
    tag: "SHARING",
    likeCount: 12,
    commentCount: 4,
    postImageList: [],
    createdAt: "2025-05-23T10:15:30",
    user: {
      userId: 1,
      nickname: "자취생123",
      profileImage: "",
    },
  },
  {
    postId: 3,
    title: "결국 샀습니다",
    content:
      "언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂",
    thumbnailImage:
      "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
    category: "TOGETHER",
    tag: "SHARING",
    likeCount: 12,
    commentCount: 4,
    postImageList: [],
    createdAt: "2025-05-23T10:15:30",
    user: {
      userId: 1,
      nickname: "자취생123",
      profileImage: "",
    },
  },
  {
    postId: 4,
    title: "결국 샀습니다",
    content:
      "언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂",
    thumbnailImage:
      "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
    category: "TOGETHER",
    tag: "SHARING",
    likeCount: 12,
    commentCount: 4,
    postImageList: [],
    createdAt: "2025-05-23T10:15:30",
    user: {
      userId: 1,
      nickname: "자취생123",
      profileImage: "",
    },
  },
  {
    postId: 5,
    title: "결국 샀습니다",
    content:
      "언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂 언젠가는 쓰겠죠..? 지금은 좀 후회 중이에요 😂",
    thumbnailImage:
      "http://k.kakaocdn.net/dn/dPnHPP/btsKoj9P3g3/xRGh0kiZNlqmQ9eCEAnyfk/img_640x640.jpg",
    category: "TOGETHER",
    tag: "SHARING",
    likeCount: 12,
    commentCount: 4,
    postImageList: [],
    createdAt: "2025-05-23T10:15:30",
    user: {
      userId: 1,
      nickname: "자취생123",
      profileImage: "",
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
    <div className="flex flex-col w-full max-w-4xl mx-auto">
      <PostListComponent category={categoryKey} />
      {categoryKey === "RANDOM_BUY" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 pt-4">
          {mockPost.map((post) => (
            <Link href={`/board/${category}/${post.postId}`} key={post.postId}>
              <PostImageCard
                key={post.postId}
                {...convertDetailToImagePostItem(post)}
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col pt-4">
          {mockPost.map((post) => (
            <Link href={`/board/${category}/${post.postId}`} key={post.postId}>
              <PostListCard key={post.postId} post={post} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
