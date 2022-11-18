import { List } from "./list";
import { SearchPanel } from "./searchPanel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProject } from "utils/Project";
import { useUsers } from "utils/Users";
import { Typography } from "antd";
import { useProjectsSearchParams } from "./util";
import { ButtonNoPadding, Row } from "components/lib";
import { useAppDispatch } from "store";
import { openProjectModal } from "store/modules/openCard";

export const ProjectListScreens = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  const {
    data: list,
    isLoading,
    error,
    retry,
  } = useProject(useDebounce(param, 500));
  const { data: users } = useUsers();
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => dispatch(openProjectModal())}
          type={"link"}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        dataSource={list || []}
        users={users || []}
        loading={isLoading}
        retry={retry}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
