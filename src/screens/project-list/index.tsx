import { List } from "./list";
import { SearchPanel } from "./searchPanel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/Project";
import { useUsers } from "utils/Users";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";

export const ProjectListScreens = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  const { data: list, isLoading, error } = useProjects(useDebounce(param, 500));

  const { data: users } = useUsers();
  const { open } = useProjectModal();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List dataSource={list || []} users={users || []} loading={isLoading} />
    </Container>
  );
};

export const Container = styled.div`
  padding: 3.2rem;
`;
