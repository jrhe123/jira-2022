import React from "react";
import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "screens/project-list/util";

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects();
  const { open } = useProjectModal();
  const pinnedProjects = projects?.filter((p) => p.pin);

  const content = (
    <ContentContainer>
      <Typography.Text>bookmarked</Typography.Text>
      <List>
        {pinnedProjects?.map((p) => (
          <List.Item>
            <List.Item.Meta title={p.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type="link">
        Create project
      </ButtonNoPadding>
    </ContentContainer>
  );
  return (
    <Popover placement="bottom" content={content}>
      <span>project</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
