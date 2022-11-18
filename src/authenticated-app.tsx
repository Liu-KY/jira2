import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";
import { useAuth } from "context/auth-context";
import { ProjectListScreens } from "screens/project-list";
import styled from "@emotion/styled";
import { Row } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route, Navigate, useNavigate } from "react-router";
import { ProjectScreens } from "screens/project";
import { useAppDispatch } from "store";
import { ProjectModal } from "screens/project-list/projectModal";
import { ProjectPopover } from "components/projectPopover";

export const AuthenticatedApp = () => {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <BrowserRouter>
        <PageHeader />

        <Main>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreens />} />
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreens />}
            />
            <Route path={"*"} element={<Navigate to="/projects" />} />
          </Routes>
        </Main>
        <ProjectModal />
      </BrowserRouter>
    </Container>
  );
};

const PageHeader = () => {
  const { user, logout } = useAuth();
  const [items] = useState<MenuProps["items"]>([
    {
      key: "1",
      label: (
        <Button onClick={logout} type={"link"}>
          登出
        </Button>
      ),
    },
  ]);

  const navigate = useNavigate();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type={"link"} onClick={() => navigate(`/`)}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>
        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{ items }}>
          <Button type={"link"} onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.div``;
