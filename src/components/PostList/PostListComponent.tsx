import { MainCategory } from "@/types/category";
import Searchbar from "../Searchbar/Searchbar";
import PostListHeader from "./PostListHeader";

interface PostListComponentProps {
  category: MainCategory;
}

const PostListComponent = ({ category }: PostListComponentProps) => {
  return (
    <div className="min-h-full flex flex-col pt-10 items-center px-4 max-w-3xl mx-auto">
      <Searchbar />
      <PostListHeader category={category} />
    </div>
  );
};

export default PostListComponent;
