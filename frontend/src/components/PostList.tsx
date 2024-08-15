import { getAllPostsAPI } from "@/service/apiClient";
import { useEffect, useState } from "react";
import PostCard from "./ui/PostCard";
import { Post } from "@/interfaces/Post";
import PostListSkeleton from "./ui/PostListSkeleton";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getAllPostsAPI()
      .then((res) => {
        setPosts(res.posts);
      })
      .catch((err) => console.error(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="mt-[89px] space-y-4 px-2 md:px-4">
      {isLoading ? (
        <PostListSkeleton />
      ) : (
        posts.map((post, idx) => <PostCard key={idx} post={post} />)
      )}
    </div>
  );
};

export default PostList;
