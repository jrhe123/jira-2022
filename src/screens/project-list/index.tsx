import React, { useEffect, useState } from "react";

import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";

import { List } from "./list";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 2000);
  const client = useHttp();

  useEffect(() => {
    client("projects", {
      data: cleanObject(debouncedParam),
    }).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h3>Project List</h3>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

/**
 * 
 * most case interface <-> type
  interface Person {
    name: string;
  }
  type Person = { name: string }

  const abc: Person = {
    name: "roytest"
  }

 *
 * some case cannot
case 1:
  type MyVar = string | number;
  let myVar: MyVar = "1"
  let myVar: MyVar = 1

case 2: utility type

2.1 reuse type / interface defined above
  Parameters<typeof http>

2.2 reuse defined type partially
  Partial<Person>

  type Person = {
    name: string;
    age: number;
  }
  const personWithAge: Partial<Person> = {
    age: 1
  }

2.3 omit defined type, delete one / more properties
  type Person = {
    name: string;
    age: number;
  }
  const hideNameInfo: Omit<Person, 'name'> = {
    age: 123
  }
  const hideAllInfo: Omit<Person, 'name' | 'age'> = {}
 */

/**
 * others for utility type
 * 
  type Person = {
    name: string;
    age: number;
  }

 * 1. keyof
 * type PersonKeys = keyof Person
 * => 'name' | 'age'
 * 
 * 2. Pick
 * type PersonOnlyName = Pick<Person, 'name'>
 * 
 * 3. Exclude
 * type Age = Exclude<PersonKeys, 'name'>
 * 
 */
