/* @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react";
import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

const DrawerCss = {
  ".ant-drawer-header-title": {
    flexDirection: "row-reverse",
  },
} as Interpolation<Theme>;

export const ProjectModal = () => {
  const { close, projectCreate } = useProjectModal();

  return (
    <Drawer onClose={close} open={projectCreate} width={"100%"} css={DrawerCss}>
      <h1>Project Modal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  );
};
