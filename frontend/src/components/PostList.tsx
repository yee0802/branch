import { getAllPostsAPI } from "@/service/apiClient";
import PostCard from "./ui/PostCard";
import { Post } from "@/interfaces/Post";
import PostListSkeleton from "./ui/PostListSkeleton";
import { useQuery } from "@tanstack/react-query";
import FallbackPage from "./FallbackPage";

const PostList = () => {
  const { data, status } = useQuery<Post[]>({
    queryKey: ["post-list"],
    queryFn: () => getAllPostsAPI().then((res) => res.posts),
  });

  if (status === "error") {
    return (
      <FallbackPage
        message="An error occurred while loading posts"
        status={500}
      />
    );
  }

  return (
    <div className="mt-[89px] space-y-4 px-2 md:px-4">
      {status === "pending" ? (
        <PostListSkeleton />
      ) : (
        data.map((post, idx) => <PostCard key={idx} post={post} />)
      )}
    </div>
  );
};

export default PostList;
