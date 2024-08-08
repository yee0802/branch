import { Author } from "./Author";

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  description: string;
  image: string;
  createdAt: string;
  author: Author;
}
