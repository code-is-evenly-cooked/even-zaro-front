import HomeComponent from "@/components/Home/HomeComponent";
import { server } from "@/lib/fetch/server";
import { HomePosts } from "@/types/post";

export default async function HomePage() {
  const posts = await server<HomePosts>("/posts/home", { needAuth: false });
  return <HomeComponent posts={posts} />;
}
