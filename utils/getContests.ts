import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getContests() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data, error } = await supabase.from("contest").select();

  if (error) {
    throw new Error("Failed to fetch data");
  }

  if (!data) {
    return [];
  }

  const sortedData = data.sort((a, b) => {
    if (a.status > b.status) {
      return -1;
    }
    if (b.status > a.status) {
      return 1;
    }
    return 0;
  });

  return sortedData;
}
