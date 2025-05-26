import HomeComponent from "@/components/Home/HomeComponent";
import { server } from "@/lib/fetch/server";
import { PostHomeResponse } from "@/types/post";

export default async function HomePage() {
  const posts = await server<PostHomeResponse>("/posts/home", {
    needAuth: false,
  });
  return <HomeComponent posts={posts} />;
}
