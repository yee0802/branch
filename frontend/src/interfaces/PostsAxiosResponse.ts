import { Post } from "./Post";

export interface PostsAxiosResponse {
  posts: Post[];
  nextCursor: string | null;
  hasNextPage: boolean;
}
