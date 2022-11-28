import { useState } from "react";
import { useKanbanQueryKey, useProjectIdInUrl } from "./utils";
import { useAddKanban } from "../../utils/kanban";
import { Container } from "./KanbanColumn";
import { Input } from "antd";

export const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync } = useAddKanban(useKanbanQueryKey());
  const submit = async () => {
    await mutateAsync({
      projectId,
      name,
    });
    setName("");
  };
  return (
    <Container>
      <Input
        size={"large"}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
      />
    </Container>
  );
};
