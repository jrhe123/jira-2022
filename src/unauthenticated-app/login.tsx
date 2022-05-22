import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";
import { Form, Input, Button } from "antd";

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

export const LoginScreen = () => {
  const { login, user } = useAuth();

  // HTMLFormElement extends Element
  // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const username = (event.currentTarget.elements[0] as HTMLInputElement)
  //     .value;
  //   const password = (event.currentTarget.elements[1] as HTMLInputElement)
  //     .value;
  //   login({
  //     username,
  //     password,
  //   });
  // };
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
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
      <Form.Item>
        <Button type="primary" htmlType="submit">
          login
        </Button>
      </Form.Item>
    </Form>
  );
};
