import HomeComponent from "@/components/Home/HomeComponent";
import { server } from "@/lib/fetch/server";
import { PostHomeResponse } from "@/types/post";

export async function generateMetadata() {
  return {
    title: "ZARO",
    description: "자취러들 사이의 은밀한 커넥션",
  };
}

export default async function HomePage() {
  const posts = await server<PostHomeResponse>("/posts/home", {
    needAuth: false,
  });
  return <HomeComponent posts={posts} />;
}
