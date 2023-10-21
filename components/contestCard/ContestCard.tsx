"use client";

import { Pencil } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

import AutoForm from "../ui/auto-form";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Row } from "@/types/database";
import { postEditContest } from "@/utils/postEditContest";
import { useEffect, useState } from "react";
import { useToast } from "../ui/use-toast";
import { z } from "zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { ArchiveContestAlert } from "@/components/archiveContestAlert/ArchiveContestAlert";

type ContestCardProps = {
  serverContest: Row<"contest">;
  nbParticipants: number;
  nbInContest: number;
  nbOutContest: number;
};
export const ContestCard = ({
  serverContest,
  nbParticipants,
  nbInContest,
  nbOutContest,
}: ContestCardProps) => {
  const supabase = createClientComponentClient<Database>();

  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contest, setContest] = useState<Row<"contest">>(serverContest);

  useEffect(() => {
    setContest(serverContest);
  }, [serverContest]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "contest" },
        (payload) => setContest(payload.new as Row<"contest">),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [serverContest]);

  const formSchema = z.object({
    title: z
      .string({
        description: "Nom du concours",
      })
      // You can use zod's built-in validation as normal
      .max(50, "Le nom ne doit pas dépasser 50 caractères."),
    description: z.string(),
    start_date: z.coerce.date({ description: "Date de début" }),
    end_date: z.coerce.date({ description: "Date de fin" }),
  });

  const EditingCard = () => {
    return (
      <CardHeader>
        <AutoForm
          formSchema={formSchema}
          fieldConfig={{
            title: {
              inputProps: {
                type: "text",
                placeholder: contest.title ?? "",
              },
            },
            description: {
              fieldType: "textarea",
            },
          }}
          onSubmit={async (values) => {
            setLoading(true);

            const { message } = await postEditContest({
              ...values,
              start_date: values.start_date.toISOString(),
              end_date: values.end_date.toISOString(),
              contest_id: contest.id,
            });

            if (!!message) {
              return toast({
                variant: "destructive",
                title: "Une erreur est survenue",
                description: message,
                duration: 3000,
              });
            }

            setLoading(false);
            setEditing(false);
          }}
        >
          <div className="flex flex-row gap-4">
            <Button type="submit" disabled={loading}>
              Sauvegarder
            </Button>
            <Button
              variant="destructive"
              onClick={() => setEditing((props) => !props)}
            >
              Annuler
            </Button>
          </div>
        </AutoForm>
      </CardHeader>
    );
  };

  const NormalCard = () => {
    return (
      <>
        <CardHeader>
          <CardTitle className="flex flex-row justify-between items-center pb-4">
            {contest.title}

            {!contest.archived ? (
              <div className="flex gap-2 items-center">
                <Pencil
                  onClick={() => setEditing((props) => !props)}
                  className="cursor-pointer hover:text-gray-500 dark:hover:text-gray-300"
                />
                <ArchiveContestAlert id={contest.id} />
              </div>
            ) : null}
          </CardTitle>
          <CardDescription>{contest.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-8">
            <div>
              <p>Début du concours</p>
              <p className="text-sm text-muted-foreground mt-1">
                {contest.start_date}
              </p>
            </div>
            <div>
              <p>Fin du concours</p>
              <p className="text-sm text-muted-foreground mt-1">
                {contest.end_date}
              </p>
            </div>
          </div>
        </CardContent>
      </>
    );
  };

  return (
    <Card className="min-w-xl max-w-2xl mx-auto">
      {editing ? <EditingCard /> : <NormalCard />}
      <CardFooter className="flex flex-row gap-8 mt-8">
        <Badge>{nbParticipants} participants</Badge>
        <Badge variant="secondary">{nbInContest} dans le concours</Badge>
        <Badge variant="outline">{nbOutContest} hors concours</Badge>
      </CardFooter>
    </Card>
  );
};
