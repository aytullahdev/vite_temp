import { SidebarInset, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { useSession } from "../auth/hooks/useSession";
import { useNavigate } from "@tanstack/react-router";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { session } = useSession();
  const navigate = useNavigate({
    from: "/dashboard",
  });

  if (!session?.access_token) {
    navigate({
      to: "/sign-in",
    });
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <SidebarInset>
        <header className="flex h-5 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"></header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
