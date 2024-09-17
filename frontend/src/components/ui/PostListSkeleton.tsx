import { Skeleton } from "@/components/ui/skeleton";

const PostListSkeleton = () => {
  return (
    <div className="flex w-full max-w-2xl flex-col justify-center space-y-8">
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
      <Skeleton className="h-40" />
    </div>
  );
};

export default PostListSkeleton;
