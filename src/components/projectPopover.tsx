import { Divider, List, Popover, Typography } from "antd";
import { useProject } from "utils/Project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useAppDispatch } from "store";
import { openProjectModal } from "store/modules/openCard";

export const ProjectPopover = () => {
  const { data: projects } = useProject();
  const pinnedProjects = projects?.filter((project) => project.pin);
  const dispatch = useAppDispatch();

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />

      <ButtonNoPadding
        onClick={() => dispatch(openProjectModal())}
        type={"link"}
      >
        编辑
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
