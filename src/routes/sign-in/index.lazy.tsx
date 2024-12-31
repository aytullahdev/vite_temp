import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "../../components/ui/button";
import supabase from "../../utils/supabase";
import { toast } from "sonner";

export const Route = createLazyFileRoute("/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
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
