import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { QueryKey, useMutation, useQuery } from "react-query";
import { useEditConfig } from "./use-optimistic-options";

export const useProjects = (params?: Partial<Project>) => {
  const http = useHttp();

  return useQuery<Project[]>(["projects", params], () =>
    http("projects", { data: cleanObject(params || {}) })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      http(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
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
