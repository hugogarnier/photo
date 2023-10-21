import {ChevronLeft} from "lucide-react";
import Link from "next/link";

type GoBackProps = {
  route: string;
  title: string;
}
export const GoBack = ({route, title}:GoBackProps) => {
  return (
    <Link
      href={route}
      className="flex flex-row py-4 hover:text-gray-500 active:text-gray-400"
    >
      <ChevronLeft /> <p>{title}</p>
    </Link>
  );
}
