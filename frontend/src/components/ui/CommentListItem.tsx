import Comment from "@/interfaces/Comment";
import defaultProfileImage from "@/assets/Default_pfp.jpg";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/utils";
import CommentOptionsButton from "./CommentOptionsButton";
import useAuth from "@/hooks/useAuth";

type CommentProps = {
  comment: Comment;
};

const CommentListItem: React.FC<CommentProps> = ({ comment }) => {
  const { user } = useAuth();

  return (
    <div className="group/comment relative flex rounded-lg border p-3">
      <span className="hidden sm:inline">
        <Link to={`/users/${comment.author.username}`}>
          <img
            src={defaultProfileImage}
            alt="user-profile-image"
            className="mr-4 rounded-full"
            width={40}
          />
        </Link>
      </span>

      <div className="flex flex-col gap-3">
        <div className="flex items-center">
          <Link
            to={`/users/${comment.author.username}`}
            className="mr-2 w-fit text-lg font-bold hover:underline"
          >
            {`${comment.author.firstName && comment.author.lastName ? `${comment.author.firstName} ${comment.author.lastName}` : comment.author.username}`}
          </Link>

          <span className="hidden text-muted-foreground sm:inline">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        <p>{comment.content}</p>
      </div>
      {user!.id === comment.author.id && (
        <div className="absolute right-3">
          <CommentOptionsButton
            comment={comment}
            className="ms-auto opacity-[0.0001] group-hover/comment:opacity-100"
          />
        </div>
      )}
    </div>
  );
};

export default CommentListItem;
