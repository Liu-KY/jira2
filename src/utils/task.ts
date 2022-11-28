import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "../types/task";
import { useAddConfig, useEditConfig } from "./use-optimistic-options";

export const useTasks = (param?: Partial<Task>) => {
  const http = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    http("tasks", { data: param })
  );
};

export const useAddTsk = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      http(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useTask = (id?: number) => {
  const http = useHttp();

  return useQuery(["task", { id }], () => http(`tasks/${id}`), {
    enabled: !!id,
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      http(`tasks/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};
