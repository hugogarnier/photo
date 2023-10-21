import { Database } from "@/lib/database.types";
import { Row } from "@/types/database";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Contest = {
  id: number;
};
export async function postArchive({ id }: Contest) {
  const supabase = createClientComponentClient<Database>();
  const { data: contest } = await supabase
    .from("contest")
    .select("*")
    .eq("id", id);

  if (!contest) {
    return { status: 400, message: "Impossible de retrouver le concours" };
  }

  const valuesToUpdate: Pick<Row<"contest">, "archived" | "status"> = {
    archived: true,
    status: "CLOSED",
  };

  const { status, error } = await supabase
    .from("contest")
    .update(valuesToUpdate)
    .eq("id", id)
    .select();

  if (error) {
    return {
      status: 400,
      message: "Une erreur est survenue",
    };
  }

  if (status !== 200) {
    return { status: 400, message: "Une erreur est survenue" };
  }

  return { status: 200, message: "" };
}
