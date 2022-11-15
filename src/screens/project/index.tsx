import { Navigate, Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanBanScreens } from "screens/kanban";

export const ProjectScreens = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>修改</Link>

      <Routes>
        <Route path={"epic"} element={<EpicScreen />} />
        <Route path={"kanban"} element={<KanBanScreens />} />
        <Route path={"*"} element={<Navigate to="kanban" />} />
      </Routes>
    </div>
  );
};
