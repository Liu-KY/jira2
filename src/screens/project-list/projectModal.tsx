/* @jsxImportSource @emotion/react */
import { Interpolation, Theme } from "@emotion/react";
import { Button, Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "store";
import { closeProjectModal, projectModalOpen } from "store/modules/openCard";

const DrawerCss = {
  ".ant-drawer-header-title": {
    flexDirection: "row-reverse",
  },
} as Interpolation<Theme>;

export const ProjectModal = () => {
  const dispatch = useAppDispatch();
  const open = useAppSelector(projectModalOpen);

  return (
    <Drawer
      onClose={() => {
        dispatch(closeProjectModal());
      }}
      open={open}
      width={"100%"}
      css={DrawerCss}
    >
      <h1>Project Modal</h1>
      <Button
        onClick={() => {
          dispatch(closeProjectModal());
        }}
      >
        关闭
      </Button>
    </Drawer>
  );
};
