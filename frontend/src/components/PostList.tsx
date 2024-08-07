import { getAllPostsAPI } from "@/service/apiClient";
import { useEffect, useState } from "react";
import PostCard from "./ui/PostCard";
import { Post } from "@/interfaces/Post";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPostsAPI()
      .then((res) => {
        setPosts(res.posts);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mt-[89px] space-y-4 px-2 md:px-4">
      {posts.map((post, idx) => (
        <PostCard key={idx} post={post} />
      ))}
    </div>
  );
};

export default PostList;
