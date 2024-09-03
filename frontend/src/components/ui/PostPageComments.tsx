import PostPageCommentsList from "./PostPageCommentList";
import useAuth from "@/hooks/useAuth";
import CreateCommentInput from "./CreateCommentInput";
import { Post } from "@/interfaces/Post";

type PostPageCommentsProps = {
  post: Post;
};

const PostPageComments: React.FC<PostPageCommentsProps> = ({ post }) => {
  const { user } = useAuth();

  return (
    <div className="mx-4 flex max-w-3xl flex-col justify-center gap-6">
      <div className="w-full max-w-3xl space-y-5 rounded-lg border p-5 shadow-sm">
        <h2 className="text-center text-lg font-bold sm:text-2xl">Comments</h2>
      </div>
      {user && <CreateCommentInput postId={post.id} />}
      <PostPageCommentsList comments={post.comments} />
    </div>
  );
};

export default PostPageComments;
