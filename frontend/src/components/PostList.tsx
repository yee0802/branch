import { getAllPostsAPI } from "@/service/apiClient";
import PostCard from "./ui/PostCard";
import PostListSkeleton from "./ui/PostListSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import CreatePostButton from "./ui/CreatePostButton";
import useAuth from "@/hooks/useAuth";
import { PostsAxiosResponse } from "@/interfaces/PostsAxiosResponse";
import { Button } from "./ui/button";

const PostList = () => {
  const { user } = useAuth();

  const { data, status, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PostsAxiosResponse>({
      queryKey: ["post-list"],
      queryFn: ({ pageParam }) => getAllPostsAPI(pageParam),
      initialPageParam: null as string | null,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
    });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

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
    <div className="mt-[89px] w-full max-w-2xl space-y-4 px-2 md:px-4">
      {status === "pending" ? (
        <PostListSkeleton />
      ) : (
        <>
          {user && <CreatePostButton />}
          {posts.map((post, idx) => (
            <PostCard key={idx} post={post} />
          ))}
          {hasNextPage && (
            <div className="flex w-full justify-center">
              <Button onClick={() => fetchNextPage()}>Load More</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PostList;
