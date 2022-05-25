import React from "react";
import { User } from "screens/project-list/search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

export interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

export const List = ({ users, refresh, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  // atom func
  // v1
  // const handlePinProject = (id: number, pin: boolean) => {
  //   mutate({ id, pin });
  // }
  // v2
  const handlePinProject = (id: number) => (pin: boolean) => {
    mutate({ id, pin }).then(refresh);
  };
  return (
    <Table
      pagination={false}
      rowKey="id"
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                // onCheckedChange={(pin) => handlePinProject(project.id, pin)}
                onCheckedChange={handlePinProject(project.id)}
              ></Pin>
            );
          },
        },
        {
          title: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "department",
          dataIndex: "organization",
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
        {
          title: "created",
          render(value, project) {
            return (
              <span key={project.personId}>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "N/A"}
              </span>
            );
          },
        },
      ]}
      {...props}
    ></Table>
  );
};
