import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getRole() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: user } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  if (user.user) {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.user.id)
      .single();

    if (error) {
      throw new Error("Failed to fetch data");
    }

    if (!data.role) {
      return null;
    }

    return data.role;
  }
}
