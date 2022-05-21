import React, { FormEvent } from "react";
import { useAuth } from "context/auth-context";

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

export const RegisterScreen = () => {
  const { register, user } = useAuth();

  // HTMLFormElement extends Element
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    register({
      username,
      password,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">register</button>
    </form>
  );
};
