import { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import supabase from "../../utils/supabase";

import { LoaderIcon } from "lucide-react";

export const SessionContext = createContext<Session | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={session}>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <LoaderIcon className="size-6 animate-spin" />
        </div>
      ) : (
        children
      )}
    </SessionContext.Provider>
  );
};
