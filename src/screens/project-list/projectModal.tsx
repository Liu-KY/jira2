/* @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react";
import { Button, Drawer, Form, Input, Spin } from "antd";
// import { useProject } from "utils/Project";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { UserSelect } from "components/userSelect";
import styled from "@emotion/styled";
import { useAddProject, useEditProject } from "utils/Project";
import { ErrorBox } from "components/lib";
import { useForm } from "antd/es/form/Form";
import { useEffect } from "react";

const DrawerCss = {
  ".ant-drawer-header-title": {
    flexDirection: "row-reverse",
  },
} as Interpolation<Theme>;

export const ProjectModal = () => {
  const { close, projectCreate, editingProject, isLoading } = useProjectModal();
  const [form] = useForm();

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoadin,
  } = useMutateProject(useProjectsQueryKey());

  const finish = async (value: any) => {
    await mutateAsync({ ...editingProject, ...value });
    form.resetFields();
    close();
  };

  const modealCloss = () => {
    form.resetFields();
    close();
  };
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      onClose={modealCloss}
      open={projectCreate}
      width={"100%"}
      css={DrawerCss}
      forceRender={true}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{editingProject ? "编辑项目" : "创建项目"}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={finish}
            >
              <Form.Item
                name={"name"}
                label={"名称"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"项目名称"} />
              </Form.Item>

              <Form.Item
                name={"organization"}
                label={"部门"}
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder={"部门名称"} />
              </Form.Item>

              <Form.Item name={"personId"} label={"负责人"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  type={"primary"}
                  htmlType={"submit"}
                  loading={mutateLoadin}
                >
                  提交
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
`;
