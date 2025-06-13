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