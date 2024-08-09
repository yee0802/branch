import { Skeleton } from "@/components/ui/skeleton";

const ArticleSkeleton = () => {
  return (
    <div className="mt-[89px] flex flex-col justify-center space-y-9 p-4">
      <Skeleton className="h-16 w-[16rem] rounded-lg sm:w-[24rem] md:w-[36rem] lg:w-[48rem]" />

      <div className="space-y-4">
        <Skeleton className="h-8 w-[12rem] sm:w-[24rem] md:w-[36rem] lg:w-[48rem]" />
        <Skeleton className="h-6 w-[10rem] sm:w-[20rem] md:w-[32rem] lg:w-[44rem]" />
      </div>
    </div>
  );
};
export default ArticleSkeleton;
