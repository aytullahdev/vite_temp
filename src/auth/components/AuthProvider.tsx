import { Session } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import supabase from "../../utils/supabase";

import { LoaderIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

export const SessionContext = createContext<{
  session: Session | null;
  logOut: () => Promise<void>;
  user: { email: string; id: string; name: string; avatar: string };
}>({
  session: null,
  logOut: async () => {},
  user: { email: "", id: "", name: "", avatar: "" },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate({
    from: "/sign-in",
  });
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    email: string;
    id: string;
    name: string;
    avatar: string;
  }>({
    email: "",
    id: "",
    name: "",
    avatar: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser({
        email: session?.user.email || "",
        id: session?.user.id || "",
        name: session?.user.user_metadata.full_name || "",
        avatar: session?.user.user_metadata.avatar_url || "",
      });
      setLoading(false);

      if (session) {
        navigate({
          to: "/dashboard",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const clearSession = async () => {
    setSession(null);
    setUser({
      email: "",
      id: "",
      name: "",
      avatar: "",
    });

    await supabase.auth.signOut();
  };

  return (
    <SessionContext.Provider
      value={{
        session: session,
        logOut: clearSession,
        user,
      }}
    >
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
