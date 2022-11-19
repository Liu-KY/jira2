/* @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react";
import { Button, Drawer, Form, Input } from "antd";
// import { useProject } from "utils/Project";
import { useProjectModal } from "./util";
import { UserSelect } from "components/userSelect";
import styled from "@emotion/styled";

const DrawerCss = {
  ".ant-drawer-header-title": {
    flexDirection: "row-reverse",
  },
} as Interpolation<Theme>;

export const ProjectModal = () => {
  const { close, projectCreate } = useProjectModal();
  // const { } = useProject()

  return (
    <Drawer onClose={close} open={projectCreate} width={"100%"} css={DrawerCss}>
      <Container>
        {
          <Form layout={"vertical"} style={{ width: "40rem" }}>
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
              <Button type={"primary"} htmlType={"submit"}>
                提交
              </Button>
            </Form.Item>
          </Form>
        }
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
