import { Database } from "@/lib/database.types";
import { Row } from "@/types/database";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getContest({ id }: { id: Row<"contest">["id"] }) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.from("contest").select().eq("id", id);

  if (error) {
    throw new Error("Failed to fetch data");
  }

  if (!data) {
    return {} as Row<"contest">;
  }

  return data[0];
}
