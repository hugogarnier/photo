import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <>
      <Skeleton className="h-4 w-[250px] m-4" />
      <Skeleton className="w-[48rem] h-[24rem] mx-auto" />
    </>
  );
}
