import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";

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

export const useAddProject = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      http(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (id: number) =>
      http(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useProject = (id?: number) => {
  const http = useHttp();

  return useQuery(["project", { id }], () => http(`projects/${id}`), {
    enabled: !!id,
  });
};
