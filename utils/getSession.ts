import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getSession() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    throw new Error("Failed to fetch data");
  }

  if (!session) {
    return null;
  }

  return session;
}
