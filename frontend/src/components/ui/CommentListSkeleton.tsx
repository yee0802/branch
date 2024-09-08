import { Skeleton } from "@/components/ui/skeleton";

const CommentListSkeleton = () => {
  return (
    <div className="flex flex-col justify-center gap-4 p-4">
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
      <Skeleton className="h-16 w-full" />
    </div>
  );
};

export default CommentListSkeleton;
