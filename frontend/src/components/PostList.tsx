import { getAllPostsAPI } from "@/service/apiClient";
import PostCard from "./ui/PostCard";
import { Post } from "@/interfaces/Post";
import PostListSkeleton from "./ui/PostListSkeleton";
import { useQuery } from "@tanstack/react-query";
import CreatePostButton from "./ui/CreatePostButton";
import useAuth from "@/hooks/useAuth";

const PostList = () => {
  const { user } = useAuth();

  const { data, status } = useQuery<Post[]>({
    queryKey: ["post-list"],
    queryFn: () => getAllPostsAPI().then((res) => res.posts),
  });

  if (status === "error") {
    return (
      <div className="flex h-screen min-h-screen w-screen flex-col">
        <div className="flex h-full flex-grow items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <h1 className="text-4xl font-semibold">500</h1>
            <p className="text-center text-xl">
              An error occurred while loading posts
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[89px] space-y-4 px-2 md:px-4">
      {status === "pending" ? (
        <PostListSkeleton />
      ) : (
        <>
          {user && <CreatePostButton />}
          {data.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
        </>
      )}
    </div>
  );
};

export default PostList;
