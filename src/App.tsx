import { AuthenticatedApp } from "authenticated-app";
import { useAuth } from "context/auth-context";
import { Unauthenticated } from "unauthenticated-app";
import "./App.css";

function App() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="App">
      {/* <ProjectListScreens /> */}
      {user ? <AuthenticatedApp /> : <Unauthenticated />}
    </div>
  );
}

export default App;
