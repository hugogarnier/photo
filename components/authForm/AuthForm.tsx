"use client";

import * as z from "zod";

import AutoForm from "../ui/auto-form";
import { Button } from "../ui/button";
import { Database } from "@/lib/database.types";
import { Loader2 } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Define your form schema using zod
const formSchema = z.object({
  email: z
    .string({
      required_error: "Email est obligatoire.",
    })
    // You can use zod's built-in validation as normal
    .email("Veuillez entrer un email valide."),
  password: z.string({
    required_error: "Mot de passe est obligatoire.",
  }),
});

export function AuthForm() {
  const router = useRouter();

  const supabase = createClientComponentClient<Database>();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <AutoForm
      formSchema={formSchema}
      fieldConfig={{
        email: {
          inputProps: {
            type: "email",
          },
        },
        password: {
          inputProps: {
            type: "password",
          },
        },
      }}
      onSubmit={async (values) => {
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
          // email: values.email,
          // password: values.password,
          email: "dev@hugogarnier.com",
          password: "Test123!",
        });

        if (error) {
          setError(error.message);
          setLoading(false);
          return;
        }

        router.refresh();

        setLoading(false);
      }}
    >
      <Button disabled={!!loading}>
        {loading && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
        <p>Se connecter</p>
      </Button>
      {error ? <p className='text-gray-500 text-sm'>{error}</p> : null}
    </AutoForm>
  );
}
