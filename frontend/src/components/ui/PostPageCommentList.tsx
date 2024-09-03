import defaultProfileImage from "@/assets/Default_pfp.jpg";
import { Link } from "react-router-dom";
import { formatDate } from "@/lib/utils";
import Comment from "@/interfaces/Comment";

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
        <div className="flex rounded-lg border p-3" key={idx}>
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
      ))}
    </div>
  );
};

export default PostPageCommentsList;
