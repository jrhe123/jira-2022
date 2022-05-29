import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { TaskTypeSelect } from "components/task-type-select";
import { UserSelect } from "components/user-select";
import React, { useEffect } from "react";
import { useEditTask } from "utils/task";
import { useTasksModal, useTasksQueryKey } from "./util";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModal = () => {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({
      ...editingTask,
      ...form.getFieldsValue(),
    });
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      visible={!!editingTaskId}
      okText="confirm"
      cancelText="cancel"
      confirmLoading={editLoading}
      onCancel={onCancel}
      onOk={onOk}
      title="edit task"
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label="task name"
          name="name"
          rules={[{ required: true, message: "please enter task name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="processor" name="processorId">
          <UserSelect defaultOptionName="processor" />
        </Form.Item>
        <Form.Item label="task type" name="typeId">
          <TaskTypeSelect defaultOptionName="task type" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
