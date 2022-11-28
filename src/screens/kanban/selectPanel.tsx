import { useTasksSearchParams } from "./utils";
import { useSetUrlSearchParam } from "../../utils/url";
import { Row } from "../../components/lib";
import { Button, Input } from "antd";
import { UserSelect } from "../../components/userSelect";
import { TaskSelect } from "../../components/taskTypeSelect";

export const SelectPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return (
    <Row gap={true} marginBottom={4}>
      <Input
        value={searchParams.name}
        placeholder={"任务名"}
        style={{ width: "20rem" }}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskSelect
        defaultOptionName={"类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}> 清空 </Button>
    </Row>
  );
};
