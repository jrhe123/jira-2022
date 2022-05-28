import React from "react";
import { Button, Drawer } from "antd";
import { useProjectModal } from "./util";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
      <h1>project modal</h1>
      <Button onClick={close}>close</Button>
    </Drawer>
  );
};
