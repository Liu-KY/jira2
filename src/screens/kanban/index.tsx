import { useDocumentTitle } from "../../utils";
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
import { TaskModal } from "./task-modal";
import { DragDropContext } from "react-beautiful-dnd";

export const KanBanScreens = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  );

  const { isLoading: taskLoading } = useTasks(useTasksSearchParams());
  const isLoading = kanbanLoading || taskLoading;

  return (
    <DragDropContext onDragEnd={() => {}}>
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
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  width: 100%;
  flex: 1;
`;
