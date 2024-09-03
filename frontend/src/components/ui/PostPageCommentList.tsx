import Comment from "@/interfaces/Comment";
import CommentListItem from "./CommentListItem";

type PostPageCommentsListProps = {
  comments: Comment[];
};

const PostPageCommentsList: React.FC<PostPageCommentsListProps> = ({
  comments,
}) => {
  if (comments.length === 0) {
    return (
      <p className="w-full max-w-3xl text-center">This post has no comments</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {comments.map((comment, idx) => (
        <CommentListItem comment={comment} key={idx} />
      ))}
    </div>
  );
};

export default PostPageCommentsList;
