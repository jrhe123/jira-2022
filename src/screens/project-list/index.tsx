import React, { useEffect, useState } from "react";

import { cleanObject, useMount, useDebounce, useDocumentTitle } from "utils";
import { useHttp } from "utils/http";

import { List } from "./list";
import { Project } from "types/project";
import { SearchPanel } from "./search-panel";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { Button, Typography } from "antd";
import { useUrlQueryParam } from "utils/url";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ErrorBox, Row } from "components/lib";

export const ProjectListScreen = () => {
  const [param, setParam] = useProjectsSearchParams();
  const { open } = useProjectModal();
  const debouncedParam = useDebounce(param, 2000);
  const {
    isLoading,
    error,
    data: list,
    // retry
  } = useProjects(debouncedParam);
  const { data: users } = useUsers();

  useDocumentTitle("Project list", false);

  return (
    <Container>
      <Row between={true}>
        <h3>Project List</h3>
        <Button onClick={open}>Create project</Button>
      </Row>
      {/* <Button onClick={retry}>test retry</Button> */}
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <ErrorBox error={error} /> : null}
      <List
        // refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = true;

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
