import { Database } from "@/lib/database.types";
import { Row } from "@/types/database";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type EditContest = {
  contest_id: number;
  description: string;
  end_date: string;
  start_date: string;
  title: string;
};
export async function postEditContest(values: EditContest) {
  const supabase = createClientComponentClient<Database>();

  const { data: contest } = await supabase
    .from("contest")
    .select("*")
    .eq("id", values.contest_id);

  if (!contest) {
    return { status: 400, message: "Impossible de retrouver le concours" };
  }

  const valuesToEdit: Row<"contest"> = {
    ...contest[0],
    description: values.description,
    end_date: values.end_date,
    start_date: values.start_date,
    title: values.title,
  };

  const { status, error } = await supabase
    .from("contest")
    .update(valuesToEdit)
    .eq("id", values.contest_id)
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
