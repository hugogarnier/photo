import { Database } from "@/lib/database.types";
import { Row } from "@/types/database";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getParticipant({
  id,
}: {
  id: Row<"contest">["id"];
}): Promise<Row<"participant">> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("participant")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error("Failed to fetch data");
  }

  if (!data) {
    return {
      contest: 0,
      created_at: "",
      email: "",
      id: 0,
      outside_contest: false,
      participant: "",
      photo: null,
      score: 0,
      title: "",
    };
  }

  return data;
}
