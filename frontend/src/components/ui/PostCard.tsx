import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Post } from "@/interfaces/Post";
import { Link } from "react-router-dom";
import { buttonVariants } from "./button";
import { cn, formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card>
      <CardHeader className="flex gap-4">
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="flex items-center gap-1 text-sm font-medium sm:text-base">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          </dd>
        </dl>
        <Link
          to={`/post/${post.id}`}
          className={cn(buttonVariants({ variant: "link" }), "py-0")}
        >
          Read More ➟
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
