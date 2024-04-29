import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/interfaces/Post";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{`@${post.author.username}`}</CardDescription>
      </CardHeader>
      <CardContent>
        <img src={post.image} />
        <p>{post.content}</p>
      </CardContent>
    </Card>
  );
};

export default PostCard;
