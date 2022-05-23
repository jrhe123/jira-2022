import { useEffect } from "react";

import { Project } from "screens/project-list/list";
import { cleanObject } from "utils/index";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(
      client("projects", {
        data: cleanObject(param || {}),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);

  return result;
};
