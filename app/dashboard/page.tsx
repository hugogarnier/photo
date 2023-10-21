import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ContestsTable } from "@/components/contestsTable/ContestsTable";
import { getContests } from "@/utils/getContests";
import { getRole } from "@/utils/getRole";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreVertical } from "lucide-react";

export const revalidate = 0;
export default async function Dashboard() {
  const contests = await getContests();
  const role = await getRole();

  const isAdmin = role === "ADMIN";

  return (
    <Tabs defaultValue="contest" className="">
      <TabsList
        className={`grid w-[400px] ${isAdmin ? "grid-cols-3" : "grid-cols-2"}`}
      >
        <TabsTrigger value="contest">Concours</TabsTrigger>
        {isAdmin ? (
          <>
            <TabsTrigger value="notation">Évaluateurs</TabsTrigger>
          </>
        ) : null}
        <TabsTrigger value="settings">Options</TabsTrigger>
      </TabsList>
      <TabsContent value="contest">
        <ContestsTable contests={contests} />
      </TabsContent>
      <TabsContent value="notation">
        <Button className="mt-4">Ajouter un évaluateur</Button>
        <Table className="max-w-2xl mx-auto mt-8">
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">dfdf</TableCell>
              <TableCell className="">dsfsdf</TableCell>
              <TableCell className="w-4 cursor-pointer">
                <MoreVertical />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  );
}
