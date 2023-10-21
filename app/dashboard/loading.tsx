import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="w-[20rem] h-10 mb-4" />
      <Skeleton className="h-[32rem]" />
    </>
  );
}
