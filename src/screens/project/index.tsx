import { Navigate, Route, Routes, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { EpicScreen } from "screens/epic";
import { KanBanScreens } from "screens/kanban";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");

  return units[units.length - 1];
};

export const ProjectScreens = () => {
  const routeType = useRouteType();
  const items = [
    {
      label: <Link to={"kanban"}>看板</Link>,
      key: "kanban",
    },
    {
      label: <Link to={"epic"}>修改</Link>,
      key: "epic",
    },
  ];
  return (
    <Container>
      <Aside>
        <Menu selectedKeys={[routeType]} items={items} mode={"inline"} />
      </Aside>

      <Main>
        <Routes>
          <Route path={"epic"} element={<EpicScreen />} />
          <Route path={"kanban"} element={<KanBanScreens />} />
          <Route path={"*"} element={<Navigate to="kanban" replace={true} />} />
        </Routes>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  height: 100%;
`;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;
