import { Post } from "@/interfaces/Post";
import PostCard from "./PostCard";

type UserPostsProps = {
  posts: Post[];
};

const UserPosts = ({ posts }: UserPostsProps) => {
  if (posts.length === 0) {
    return (
      <p className="w-full max-w-3xl text-center">This user has no posts</p>
    );
  }

  return (
    <>
      <div className="flex w-full max-w-2xl flex-col justify-center gap-y-4">
        {posts?.map((post, idx) => <PostCard key={idx} post={post} />)}
      </div>
    </>
  );
};

export default UserPosts;
