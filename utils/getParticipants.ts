import { Database } from "@/lib/database.types";
import { Row } from "@/types/database";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getParticipants({
  id,
}: {
  id: Row<"contest">["id"];
}): Promise<Row<"participant">[]> {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase
    .from("participant")
    .select()
    .eq("contest", id);

  if (error) {
    throw new Error("Failed to fetch data");
  }

  if (!data) {
    return [];
  }

  return data;
}
