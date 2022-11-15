import qs from "qs";
import { useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useProject = (params?: Partial<Project>) => {
  const { run, ...remain } = useAsync<Project[]>();
  const http = useHttp();
  useEffect(() => {
    run(http("projects", { data: cleanObject(params || {}) }));
  }, [params]);
  return remain;
};
