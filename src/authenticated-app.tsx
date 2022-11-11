import { Button } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreens } from "screens/project-list";
export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <Button onClick={logout} type={"primary"}>
        登出
      </Button>
      <ProjectListScreens />
    </div>
  );
};
