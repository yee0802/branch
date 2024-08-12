import { Post } from "@/interfaces/Post";
import { Link } from "react-router-dom";

interface PostPageContentProps {
  post?: Post;
}

const PostPageContent: React.FC<PostPageContentProps> = ({ post }) => {
  return (
    <article className="prose dark:prose-invert mt-[89px] max-w-3xl px-2 py-6">
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight sm:text-left lg:text-5xl">
        {post?.title}
      </h1>
      <p className="mt-4 border-b pb-4 text-center sm:text-left">
        Created by{" "}
        <Link
          className="font-bold underline"
          to={`/user/${post?.author?.username}`}
        >
          {post?.author?.username}
        </Link>
      </p>
      <p className="text-center text-lg italic leading-7 [&:not(:first-child)]:mt-6">
        {post?.description}
      </p>
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-center sm:text-left">
        Lorem ipsum
      </h2>
      <p className="mt-4 text-center text-xl font-normal leading-7 sm:text-left">
        {post?.content}
      </p>
    </article>
  );
};

export default PostPageContent;
