import { createLazyFileRoute } from "@tanstack/react-router";
import Layout from "../../components/layout";

export const Route = createLazyFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <p>Dashboard</p>
    </Layout>
  );
}
