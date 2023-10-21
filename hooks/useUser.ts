import { useEffect, useState } from "react";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const useUser = () => {
  const supabase = createClientComponentClient<Database>();

  const [user, setUser] = useState("");

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      if (session) return setUser(session.user?.id);
      setUser("");
    });
    // (async () => {
    //   supabase.auth.onAuthStateChange((_, session) => {
    //     if (session) return setUser(session.user?.id);
    //     setUser("");
    //   });

    // const {
    //   data: { session },
    // } = await supabase.auth.getSession();

    // if (session) setUser(session.user?.id);
    // })();
  }, [supabase.auth]);

  return user;
};
