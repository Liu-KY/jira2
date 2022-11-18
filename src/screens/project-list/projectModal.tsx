import { Button, Drawer } from "antd";
import { useAppDispatch, useAppSelector } from "store";
import { closeProjectModal, projectModalOpen } from "store/modules/openCard";

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
