import styled from "@emotion/styled";
import React from "react";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl } from "./util";

export const KanbanScreen = () => {
  useDocumentTitle("Kanban list", false);

  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans } = useKanbans(useKanbanSearchParams());

  console.log("check: ", useKanbanSearchParams());
  console.log("kanbans: ", kanbans);

  return (
    <div>
      <h1>{currentProject?.name}</h1>
      <ColumnsContainer>
        {kanbans?.map((kanban) => (
          <KanbanColumn key={kanban.id} kanban={kanban} />
        ))}
      </ColumnsContainer>
    </div>
  );
};

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
