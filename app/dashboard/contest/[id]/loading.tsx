import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="w-[16rem] h-4 mb-4" />
      <Skeleton className="w-[16rem] h-[16rem] mx-auto sm:w-[24rem] md:w-[42rem] mb-16" />
      <Skeleton className="h-[24rem] w-[24rem] sm:w-[36rem] md:w-[45rem] lg:w-[46rem] xl:w-[64rem] mx-auto" />
    </>
  );
}
