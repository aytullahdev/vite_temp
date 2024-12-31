import "./App.css";
import { useSession } from "./auth/hooks/useSession";
import { Button } from "./components/ui/button";

function App() {
  const session = useSession();

  if (!session) {
    return <div>No.</div>;
  }

  return (
    <>
      <Button>{session.user?.email}</Button>
    </>
  );
}

export default App;
