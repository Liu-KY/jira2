import { useDocumentTitle } from "../../utils";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./utils";
import { useTasks } from "../../utils/task";
import { useKanbans } from "../../utils/kanban";
import { KanbanColumn } from "./KanbanColumn";
import styled from "@emotion/styled";
import { ScreenContainer } from "../../components/lib";

export const KanBanScreens = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { isLoading } = useTasks(useTasksSearchParams());
  return (
    <ScreenContainer>
      {isLoading}
      <h1>{currentProject?.name}看板</h1>

      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnsContainer>
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
`;
