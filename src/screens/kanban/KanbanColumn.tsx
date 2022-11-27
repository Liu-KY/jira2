import { Kanban } from "types/kanban";
import { Card } from "antd";
import { Task } from "../../types/task";
import { useTasks } from "../../utils/task";
import { useTasksSearchParams } from "./utils";
import styled from "@emotion/styled";

import { useTaskTypes } from "utils/task-type";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return name === "task" ? <p>完成</p> : <p>bug</p>;
};

const TaskCard = ({ task }: { task: Task }) => {
  return (
    <Card style={{ flex: "1" }}>
      <p>{task.name}</p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </TasksContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  min-width: 27rem;
  min-height: 27rem;
  border-radius: 7px;
  background-color: rgb(244, 245, 247);
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
