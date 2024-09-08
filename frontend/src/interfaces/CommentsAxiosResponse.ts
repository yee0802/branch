import Comment from "./Comment";

interface CommentsAxiosResponse {
  comments: Comment[];
  nextCursor: string | null;
  hasNextPage: boolean;
}

export default CommentsAxiosResponse;
