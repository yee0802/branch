import { Skeleton } from "@/components/ui/skeleton";

const PostListSkeleton = () => {
  return (
    <div className="min-w-screen flex w-full flex-col justify-center space-y-8">
      <Skeleton className="h-40 w-[19rem] rounded-lg sm:w-[36rem] md:w-[40rem] lg:w-[48rem]" />
      <Skeleton className="h-40 w-[19rem] rounded-lg sm:w-[36rem] md:w-[40rem] lg:w-[48rem]" />
      <Skeleton className="h-40 w-[19rem] rounded-lg sm:w-[36rem] md:w-[40rem] lg:w-[48rem]" />
    </div>
  );
};

export default PostListSkeleton;
