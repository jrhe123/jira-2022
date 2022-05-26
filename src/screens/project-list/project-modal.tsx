import React from "react";
import { Button, Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOpen}
      width={"100%"}
    >
      <h1>project modal</h1>
      <Button onClick={props.onClose}>close</Button>
    </Drawer>
  );
};
