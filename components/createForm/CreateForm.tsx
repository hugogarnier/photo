"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import AutoForm from "../ui/auto-form";
import { Button } from "../ui/button";
import { postContest } from "@/utils/postContest";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";

export function CreateForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    title: z
      .string({
        required_error: "Nom obligatoire.",
        description: "Nom du concours",
      })
      // You can use zod's built-in validation as normal
      .max(50, "Le nom ne doit pas dépasser 50 caractères."),
    description: z.string(),
    start_date: z.coerce.date({ description: "Date de début" }),
    end_date: z.coerce.date({ description: "Date de fin" }),
  });

  return (
    <Card className='max-w-xl mx-auto'>
      <CardHeader>
        <CardTitle>Nouveau concours</CardTitle>
        <CardDescription>
          Création d&apos;un nouveau concours. Veuillez bien vérifier qu&apos;il
          n&apos;y en a plus d&apos;actif.
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <AutoForm
          formSchema={formSchema}
          fieldConfig={{
            title: {
              inputProps: {
                type: "text",
                name: "Nom du concours",
              },
            },
            description: {
              fieldType: "textarea",
            },
          }}
          onSubmit={async (values) => {
            setLoading(true);
            const { status, error } = await postContest(values);

            if (status === 201) {
              setLoading(false);
              return router.push("/dashboard");
            }

            toast({
              variant: "destructive",
              title: "Une erreur est survenue",
              description: error,
              duration: 3000,
            });

            setLoading(false);
          }}
        >
          <Button type='submit' disabled={loading}>
            Créer le concours
          </Button>
        </AutoForm>
      </CardContent>
    </Card>
  );
}
