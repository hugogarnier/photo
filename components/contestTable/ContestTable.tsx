import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";
import { Row } from "@/types/database";

interface ContestTableProps {
  contestId: Row<"contest">["id"];
  participants: Row<"participant">[];
}
export const ContestTable = ({
  contestId,
  participants,
}: ContestTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead className="max-w-xs lg:max-w-xl truncate">
            Titre de la photo
          </TableHead>
          <TableHead>Photo</TableHead>
          <TableHead className="text-right">Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="cursor-pointer">
        {participants
          .sort((a, b) => b.score - a.score)
          .map((participant) => (
            <Link
              key={participant.id}
              href={`/dashboard/contest/${contestId}/participant/${participant.id}`}
              legacyBehavior
            >
              <TableRow>
                <TableCell className="font-medium">
                  {participant.participant}
                </TableCell>
                <TableCell>{participant.title}</TableCell>
                <TableCell>
                  <div className="w-[100px] lg:w-[200px]">
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={participant.photo ?? "/images/placeholder.png"}
                        alt="Image"
                        fill
                        className="rounded-md object-cover"
                      />
                    </AspectRatio>
                  </div>
                </TableCell>
                <TableCell className="text-end">{participant.score}</TableCell>
              </TableRow>
            </Link>
          ))}
      </TableBody>
    </Table>
  );
};
