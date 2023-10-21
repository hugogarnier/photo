import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContestCard } from "@/components/contestCard/ContestCard";
import { ContestTable } from "@/components/contestTable/ContestTable";
import { Row } from "@/types/database";
import { getContest } from "@/utils/getContest";
import { getParticipants } from "@/utils/getParticipants";
import { GoBack } from "@/components/goBack/GoBack";

export default async function Contest({
  params,
}: {
  params: { id: Row<"contest">["id"] };
}) {
  const contest = await getContest({ id: params.id });
  const participants = await getParticipants({ id: params.id });

  const inContestParticipants = participants.filter(
    (participant) => !participant.outside_contest,
  );
  const outContestParticipants = participants.filter(
    (participant) => participant.outside_contest,
  );

  return (
    <>
      <GoBack route={"/dashboard"} title={"liste des concours"} />
      <ContestCard
        serverContest={contest}
        nbParticipants={participants.length}
        nbInContest={inContestParticipants.length}
        nbOutContest={outContestParticipants.length}
      />

      <section className="mx-auto max-w-5xl mt-10">
        <Tabs defaultValue="contest" className="">
          <TabsList className={`grid w-[400px] grid-cols-2`}>
            <TabsTrigger value="contest">Concours</TabsTrigger>
            <TabsTrigger value="outside">Hors concours</TabsTrigger>
          </TabsList>
          <TabsContent value="contest">
            <ContestTable
              participants={inContestParticipants}
              contestId={contest.id}
            />
          </TabsContent>
          <TabsContent value="outside">
            <ContestTable
              participants={outContestParticipants}
              contestId={contest.id}
            />
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
}
