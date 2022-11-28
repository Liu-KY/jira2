import { Kanban } from "types/kanban";
import { Button, Card, Dropdown, Modal, Typography } from "antd";
import { Task } from "../../types/task";
import { useTasks } from "../../utils/task";
import { useKanbanQueryKey, useTaskModal, useTasksSearchParams } from "./utils";
import styled from "@emotion/styled";
import { useTaskTypes } from "utils/task-type";
import { CreateTask } from "./create-task";
import { Mark } from "components/mark";
import { Row } from "../../components/lib";
import { useDeleteKanban } from "../../utils/kanban";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  return name === "task" ? (
    <Typography.Text type={"success"}>完成</Typography.Text>
  ) : (
    <Typography.Text type={"danger"}>bug</Typography.Text>
  );
};

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name } = useTasksSearchParams();
  return (
    <Card style={{ flex: "1" }} onClick={() => startEdit(task.id)}>
      <p>
        <Mark keyword={name} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const taskSearchParams = useTasksSearchParams();
  const { data: allTasks } = useTasks(taskSearchParams);
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbanQueryKey());
  const startDelete = () => {
    Modal.confirm({
      title: "删除看板",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        return mutateAsync(kanban.id);
      },
    });
  };

  const items = [
    {
      label: (
        <Button onClick={startDelete} type={"link"}>
          删除
        </Button>
      ),
      key: "delete",
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin: 0 1.5rem 1.5rem 0;
  min-width: 27rem;
  border-radius: 7px;
  background-color: rgb(244, 245, 247);
  overflow: hidden;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
