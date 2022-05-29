import React from "react";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTasksSearchParams } from "./util";

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks({ kanbanId: kanban.id });

  console.log("check 2: ", useTasksSearchParams());
  console.log("check 3: ", kanban);
  console.log("allTasks: ", allTasks);

  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
};
