import { Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/Project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "../screens/project-list/util";
import { useMemo } from "react";

export const ProjectPopover = () => {
  const { data: projects, refetch } = useProjects();

  const pinnedProjects = useMemo(
    () => projects?.filter((project) => project.pin),
    [projects]
  );
  const { open } = useProjectModal();

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
      <ButtonNoPadding onClick={open} type={"link"}>
        编辑
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover
      placement={"bottom"}
      content={content}
      onOpenChange={() => refetch()}
    >
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
