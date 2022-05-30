import styled from "@emotion/styled";
import { Drawer, DrawerProps, Button, Form, Input, Spin } from "antd";
import React, { useEffect } from "react";
import { ErrorBox } from "components/lib";
import { useAddEpic } from "utils/epic";
import { useEpicsQueryKey } from "./util";
import { useForm } from "antd/lib/form/Form";
import { useProjectIdInUrl } from "screens/kanban/util";

export const CreateEpic = (
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) => {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicsQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();

  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId: projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);

  return (
    <Drawer
      forceRender={true}
      visible={props.visible}
      onClose={props.onClose}
      destroyOnClose={true}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h3>Create epic</h3>
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
                rules={[{ required: true, message: "please enter epic name" }]}
              >
                <Input placeholder="please enter epic name" />
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button loading={isLoading} type="primary" htmlType="submit">
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
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
