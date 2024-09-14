import { Post } from "./Post";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  avatarURL: string;
  bio: string;
  email: string;
  createdAt: string;
  posts: Post[];
}

export default User;
