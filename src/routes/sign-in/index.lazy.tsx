import { createLazyFileRoute, Link } from "@tanstack/react-router";
import { Button } from "../../components/ui/button";
import supabase from "../../utils/supabase";
import { toast } from "sonner";
import { useSession } from "../../auth/hooks/useSession";

export const Route = createLazyFileRoute("/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  const session = useSession();

  if (session) {
    return (
      <div className="min-h-screen min-w-full flex justify-center items-center">
        <div className="flex flex-row gap-2">
          <p>Already signed in go to</p>
          <Link to="/dashboard" className="font-bold underline">
            Dashboard
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen min-w-full flex justify-center items-center">
      <Button
        onClick={async () => {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
          });
          if (error) {
            toast.error("Failed to sign in");
          } else {
            toast.success("Signed in successfully");
          }
        }}
      >
        Sign In with Google
      </Button>
    </div>
  );
}
