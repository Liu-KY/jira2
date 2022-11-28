import { useDebounce, useDocumentTitle } from "../../utils";
import {
  useKanbanSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./utils";
import { useKanbans } from "../../utils/kanban";
import { KanbanColumn } from "./KanbanColumn";
import styled from "@emotion/styled";
import { ScreenContainer } from "../../components/lib";
import { SelectPanel } from "./selectPanel";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";

export const KanBanScreens = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { isLoading: taskLoading } = useTasks(
    useDebounce(useTasksSearchParams(), 500)
  );
  const isLoading = kanbanLoading || taskLoading;

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SelectPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnsContainer>
          {kanbans?.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnsContainer>
      )}
    </ScreenContainer>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  flex: 1;
`;
