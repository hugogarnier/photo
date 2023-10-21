import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export async function logout() {
  const supabase = createClientComponentClient<Database>();
  await supabase.auth.signOut();
  await supabase.auth.setSession({ access_token: "", refresh_token: "" });
}
