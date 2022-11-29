import { Button, List, Modal } from "antd";
import { Row, ScreenContainer } from "components/lib";
import { useDocumentTitle } from "../../utils";
import { useProjectInUrl } from "../kanban/utils";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { useEpicQueryKey, useEpicSearchParams } from "./utils";
import dayjs from "dayjs";
import { useTasks } from "../../utils/task";
import { Link } from "react-router-dom";
import { CreateEpic } from "./create-epic";
import { useState } from "react";

export const EpicScreen = () => {
  useDocumentTitle("任务组");
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutateAsync: deleteMutate } = useDeleteEpic(useEpicQueryKey());
  const [createEpicOpen, setCreateEpicOpen] = useState(false);

  const startDelete = (id: number) => {
    Modal.confirm({
      title: "删除任务组",
      okText: "确认",
      cancelText: "取消",
      onOk: async () => {
        await deleteMutate(id);
      },
    });
  };

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}任务组</h1>
        <Button type={"link"} onClick={() => setCreateEpicOpen(true)}>
          创建任务组
        </Button>
      </Row>
      <List
        itemLayout={"vertical"}
        dataSource={epics}
        renderItem={(epic) => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => startDelete(epic.id)}>
                    删除
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter((task) => task.epicId === epic.id)
                ?.map((task) => (
                  <div key={task.id}>
                    <Link
                      to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                    >
                      {task.name}
                    </Link>
                  </div>
                ))}
            </div>
          </List.Item>
        )}
      ></List>
      <CreateEpic
        onClose={() => setCreateEpicOpen(false)}
        open={createEpicOpen}
      />
    </ScreenContainer>
  );
};
