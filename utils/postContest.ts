import { Database } from "@/lib/database.types";
import { InsertDto } from "@/types/database";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Contest = {
  description: string;
  end_date: Date;
  start_date: Date;
  title: string;
};
export async function postContest(values: Contest) {
  const supabase = createClientComponentClient<Database>();
  const { data } = await supabase
    .from("contest")
    .select("*")
    .eq("status", "OPEN");

  if (data && !!data.length) {
    return {
      status: 400,
      error:
        "Veuillez fermer le concours actif en cours avant d'en créer un nouveau",
    };
  }

  const dataToInsert: InsertDto<"contest"> = {
    archived: false,
    description: values.description,
    end_date: values.end_date.toISOString(),
    start_date: values.start_date.toISOString(),
    status: "OPEN",
    title: values.title,
  };

  const { status, error } = await supabase.from("contest").insert(dataToInsert);

  if (error) {
    return {
      status: 400,
      error: error.message,
    };
  }

  if (status !== 201) {
    return { status: 400, error: "Une erreur est survenue" };
  }

  return { status, error: "" };
}
