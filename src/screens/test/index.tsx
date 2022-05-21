import React from "react";
import { useMount, useArray } from "utils";

export interface IPerson {
  name: string;
  age: number;
}

export const TsReactTest = () => {
  const persons: IPerson[] = [
    { name: "jack", age: 12 },
    { name: "ma", age: 23 },
  ];

  const { value, clear, removeIndex, add } = useArray(persons);

  useMount(() => {});

  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add john</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button onClick={() => clear()}>clear</button>
      {value.map((person: IPerson, index: number) => (
        <div key={index}>
          <span>{index}</span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
