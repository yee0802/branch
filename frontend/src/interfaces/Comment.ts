import { Author } from "./Author";

interface Comment {
  id: string;
  content: string;
  author: Author;
  createdAt: string;
}

export default Comment;
