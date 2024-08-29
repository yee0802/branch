import useAuth from "@/hooks/useAuth";
import { Post } from "@/interfaces/Post";
import { Link } from "react-router-dom";
import PostOptionsButton from "./PostOptionsButton";

interface PostPageContentProps {
  post: Post;
}

const PostPageContent: React.FC<PostPageContentProps> = ({ post }) => {
  const { user } = useAuth();

  return (
    <article className="prose dark:prose-invert mx-4 mt-[89px] w-[48rem] rounded-b-xl border-x border-b px-6 py-6">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight sm:text-left md:text-5xl">
        {post.title}
      </h1>

      <p className="text-center text-lg italic leading-7 sm:text-left [&:not(:first-child)]:mt-6">
        {post.description}
      </p>

      <div className="flex items-center justify-between border-b">
        <p className="mt-4 pb-4 text-center sm:text-left">
          Created by{" "}
          <Link
            className="text-lg font-bold"
            to={`/users/${post.author.username}`}
          >
            {post.author.username}
          </Link>
        </p>
        {user?.id === post.author.id && <PostOptionsButton post={post} />}
      </div>

      <p className="mt-4 text-center text-lg font-normal leading-7 sm:text-left sm:text-xl md:text-2xl">
        {post.content}
      </p>
    </article>
  );
};

export default PostPageContent;
