import Comment from "@/interfaces/Comment";
import defaultProfileImage from "@/assets/Default_pfp.jpg";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/utils";

type CommentProps = {
  comment: Comment;
};

const CommentListItem: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className="flex rounded-lg border p-3">
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

      <div className="flex flex-col">
        <div>
          <Link
            to={`/users/${comment.author.username}`}
            className="mr-2 w-fit text-lg font-bold hover:underline"
          >
            {`${comment.author.firstName && comment.author.lastName ? `${comment.author.firstName} ${comment.author.lastName}` : comment.author.username}`}
          </Link>

          <span className="text-muted-foreground">
            {formatDate(comment.createdAt)}
          </span>
        </div>

        <p>{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentListItem;
