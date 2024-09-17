import PostCard from "./ui/PostCard";
import PostListSkeleton from "./ui/PostListSkeleton";
import { useInfiniteQuery } from "@tanstack/react-query";
import CreatePostButton from "./ui/CreatePostButton";
import useAuth from "@/hooks/useAuth";
import { PostsAxiosResponse } from "@/interfaces/PostsAxiosResponse";
import { Button } from "./ui/button";

type PostListProps = {
  getPosts: (cursor: unknown) => Promise<PostsAxiosResponse>;
  isMainFeed?: boolean;
  className?: string;
  userId?: string;
};

const PostList: React.FC<PostListProps> = ({
  getPosts,
  isMainFeed,
  userId,
  className,
}) => {
  const { user } = useAuth();

  const { data, status, fetchNextPage, hasNextPage } =
    useInfiniteQuery<PostsAxiosResponse>({
      queryKey: userId ? ["user-posts", userId] : ["post-list"],
      queryFn: ({ pageParam }) => getPosts(pageParam),
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
    <div className={className}>
      {status === "pending" ? (
        <PostListSkeleton />
      ) : (
        <>
          {isMainFeed && user && <CreatePostButton />}
          {posts.length > 0 ? (
            posts.map((post, idx) => <PostCard key={idx} post={post} />)
          ) : (
            <p className="w-full max-w-3xl text-center">
              {userId ? "This user has no posts" : "No posts available"}
            </p>
          )}
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
