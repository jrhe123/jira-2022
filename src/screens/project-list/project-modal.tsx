import React, { useEffect } from "react";
import { Button, Drawer, Spin, Form, Input } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { UserSelect } from "components/user-select";
import { useAddProject, useEditProject } from "utils/project";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();

  const title = editingProject ? "edit project" : "create project";

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());

  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h3>{title}</h3>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout="vertical"
              style={{
                width: "40rem",
              }}
              onFinish={onFinish}
            >
              <Form.Item
                label="name"
                name="name"
                rules={[
                  { required: true, message: "please enter project name" },
                ]}
              >
                <Input placeholder="please enter project name" />
              </Form.Item>
              <Form.Item
                label="organization"
                name="organization"
                rules={[
                  { required: true, message: "please enter organization name" },
                ]}
              >
                <Input placeholder="please enter organization name" />
              </Form.Item>
              <Form.Item label="person" name="personId">
                <UserSelect defaultOptionName="person" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type="primary"
                  htmlType="submit"
                >
                  submit
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
  flex-direction: column;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
