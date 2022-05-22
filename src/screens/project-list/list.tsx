import React from "react";
import { User } from "screens/project-list/search-panel";
import { Table } from "antd";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

export interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: "name",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "manager",
          render(value, project) {
            return (
              <span key={project.personId}>
                {users.find((user) => user.id === project.personId)?.name ||
                  "unknown"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    ></Table>
  );
};
