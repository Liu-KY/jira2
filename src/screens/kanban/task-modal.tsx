import { useTaskModal, useTasksQueryKey } from "./utils";
import { useForm } from "antd/es/form/Form";
import { useEditTask } from "../../utils/task";
import { useEffect } from "react";
import { Form, Input, Modal } from "antd";
import { UserSelect } from "components/userSelect";
import { TaskSelect } from "../../components/taskTypeSelect";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const { editingTaskId, close, editingTask } = useTaskModal();
  const [form] = useForm();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
    console.log(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      open={!!editingTaskId}
    >
      <Form form={form} initialValues={editingTask} {...layout}>
        <Form.Item
          name={"name"}
          label={"任务名"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name={"processorId"} label={"经办人"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item name={"typeId"} label={"类型"}>
          <TaskSelect />
        </Form.Item>
      </Form>
    </Modal>
  );
};
