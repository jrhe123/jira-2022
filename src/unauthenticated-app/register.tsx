import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";
import styled from "@emotion/styled";
import { useAsync } from "utils/use-async";

/**
 * duck extension, unlike java object oriented, it's interface oriented

interface Base {
  id: number;
}
interface Advanced extends Base {
  name: string;
}
const a: Advanced = {
  id: 1,
  name: "tester"
}
const b = {
  id: 1,
  name: "tester"
}

const test = (p: Base) => {};
test(a)
test(b)

 * they're both ok, as long as b contains "id"
 */

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register, user } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  // HTMLFormElement extends Element
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   register({
  //     username,
  //     password,
  //   });
  // };
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("Password do not matched"));
      return;
    }
    await run(register(values)).catch(onError);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "username is required" }]}
      >
        <Input type="text" id="username" placeholder="username" />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "password is required" }]}
      >
        <Input type="password" id="password" placeholder="password" />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "cpassword is required" }]}
      >
        <Input type="password" id="cpassword" placeholder="confirm password" />
      </Form.Item>
      <Form.Item>
        <FullWidthButton loading={isLoading} type="primary" htmlType="submit">
          register
        </FullWidthButton>
      </Form.Item>
    </Form>
  );
};

const FullWidthButton = styled(Button)`
  width: 100%;
`;
