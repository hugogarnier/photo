import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Badge } from "../ui/badge";
import { CONTEST_STATUS } from "@/types/contestStatus";
import Link from "next/link";
import { Row } from "@/types/database";

interface ContestsTableProps {
  contests: Row<"contest">[];
}
export function ContestsTable({ contests }: ContestsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nom</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date de début</TableHead>
          <TableHead>Date de fin</TableHead>
          <TableHead className='text-right'>Statut</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className='cursor-pointer'>
        {contests.map((contest) => (
          <Link
            key={contest.id}
            href={`/dashboard/contest/${contest.id}`}
            legacyBehavior
          >
            <TableRow>
              <TableCell className='font-medium'>{contest.title}</TableCell>
              <TableCell className='max-w-xs lg:max-w-xl truncate'>
                {contest.description}
              </TableCell>
              <TableCell>{contest.start_date}</TableCell>
              <TableCell>{contest.end_date}</TableCell>
              <TableCell className='text-right'>
                <Badge
                  variant={
                    CONTEST_STATUS[contest.status] === "Actif"
                      ? "default"
                      : "secondary"
                  }
                >
                  {CONTEST_STATUS[contest.status]}
                </Badge>
              </TableCell>
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}
