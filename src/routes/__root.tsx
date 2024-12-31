import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { AuthProvider } from "../auth/components/AuthProvider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <AuthProvider>
      <React.Fragment>
        <Outlet />
      </React.Fragment>
    </AuthProvider>
  );
}
