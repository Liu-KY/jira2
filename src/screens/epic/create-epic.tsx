import { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useAddEpic } from "../../utils/epic";
import { useEpicQueryKey } from "./utils";
import { useProjectIdInUrl } from "../kanban/utils";
import { Button, Drawer, DrawerProps, Form, Input, Spin } from "antd";
import { ErrorBox } from "../../components/lib";
import styled from "@emotion/styled";

export const CreateEpic = (
  props: Pick<DrawerProps, "open"> & { onClose: () => void }
) => {
  const [form] = useForm();
  const { mutate, isLoading, error } = useAddEpic(useEpicQueryKey());
  const projectId = useProjectIdInUrl();

  const onFinish = async (value: any) => {
    console.log(value);
    await mutate({ ...value, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.open]);

  return (
    <Drawer
      open={props.open}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"small"} />
        ) : (
          <>
            <h1>创建任务组件</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                rules={[{ required: true, message: "请输入任务组名称" }]}
                name={"name"}
              >
                <Input placeholder={"请输入用户组名称哦"} />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={isLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  确定
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
