import { useContext } from "react";
import { SessionContext } from "../components/AuthProvider";

export const useSession = () => {
  const session = useContext(SessionContext);
  return session;
};
