import React from "react";
import { Button, Divider, List, Popover, Typography } from "antd";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useUsers } from "utils/user";

export const UserPopover = () => {
  const { data: users, refetch } = useUsers();

  const content = (
    <ContentContainer>
      <Typography.Text>user list</Typography.Text>
      <List>
        {users?.map((user) => (
          <List.Item key={user.id}>
            <List.Item.Meta title={user.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
    </ContentContainer>
  );
  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement="bottom"
      content={content}
    >
      <span>user</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
