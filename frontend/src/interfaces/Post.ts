import { Author } from "./Author";
import Comment from "./Comment";

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  description: string;
  image: string;
  author: Author;
  comments: Comment[];
  createdAt: string;
}
