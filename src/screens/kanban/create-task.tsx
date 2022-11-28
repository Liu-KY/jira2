import { useEffect, useState } from "react";
import { useProjectIdInUrl, useTasksQueryKey } from "./utils";
import { useAddTsk } from "../../utils/task";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync } = useAddTsk(useTasksQueryKey());
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await mutateAsync({ projectId, name, kanbanId });
    setName("");
    setInputMode(false);
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+创建事务</div>;
  }

  return (
    <Card>
      <Input
        value={name}
        placeholder={"需要做些什么"}
        onChange={(evt) => setName(evt.target.value)}
        onPressEnter={submit}
        onBlur={toggle}
        autoFocus={true}
      />
    </Card>
  );
};
