export interface RankedPostResponseItem {
  postId: number;
  title: string;
  likeCount: number;
  commentCount: number;
  baselineRankIndex: number;
  currentRankIndex: number;
  rankChange: number;
  category?: string;
}

export async function fetchPopularPosts(): Promise<RankedPostResponseItem[]> {
  try{
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/rank`);
    const data = await response.json();

    return data.data.posts as RankedPostResponseItem[];
  } catch (error) {
    console.log("Error fetching popular posts: ", error);
    return [];
  }
}

export function getChangedPostIds(
  current: RankedPostResponseItem[],
  prev: RankedPostResponseItem[]
): number[] {
  return current
    .filter((post) => {
      const previous = prev.find((p) => p.postId === post.postId);
      return !previous || previous.currentRankIndex !== post.currentRankIndex;
    })
    .map((post) => post.postId);
}

export function normalizePosts(posts: RankedPostResponseItem[]):RankedPostResponseItem[] {
  return posts.map((post) => ({
    ...post,
    rankChange: post.rankChange ?? 0,
  }));
}

export function getTop5Posts(posts: RankedPostResponseItem[]): RankedPostResponseItem[] {
  return posts.slice(0, 5);
}