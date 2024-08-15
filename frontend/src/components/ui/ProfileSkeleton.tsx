import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="mt-[89px] flex flex-col justify-center space-y-8">
      <Skeleton className="h-48 w-[20rem] rounded-lg sm:w-[36rem] md:w-[40rem] lg:w-[48rem]" />

      <div className="space-y-4">
        <Skeleton className="h-16 w-[20rem] sm:w-[36rem] md:w-[40rem] lg:w-[48rem]" />
      </div>
    </div>
  );
};

export default ProfileSkeleton;
