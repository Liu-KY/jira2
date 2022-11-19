import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useProjects = (params?: Partial<Project>) => {
  const { run, ...remain } = useAsync<Project[]>();
  const http = useHttp();
  const async = useCallback(
    () => http("projects", { data: cleanObject(params || {}) }),
    [http, params]
  );

  useEffect(() => {
    run(async(), { retry: async });
  }, [params, run, async]);
  return remain;
};

export const useEditProject = () => {
  const { run, ...remain } = useAsync<Project[]>();
  const http = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      http(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...remain,
  };
};

export const useAddProject = () => {
  const { run, ...remain } = useAsync<Project[]>();
  const http = useHttp();
  const mutate = (params: Partial<Project>) => {
    run(
      http(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };

  return {
    mutate,
    ...remain,
  };
};

export const useDeleteProject = () => {};

export const useProject = () => {};
