import { Post } from "./Post";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  posts: Post[];
}

export default User;
