import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "../types/task";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-options";
import { useDebounce } from "./index";

export const useTasks = (param?: Partial<Task>) => {
  const http = useHttp();
  const debouncedParam = { ...param, name: useDebounce(param?.name, 200) };

  return useQuery<Task[]>(["tasks", debouncedParam], () =>
    http("tasks", { data: debouncedParam })
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

export const useDeleteTask = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (id: number) =>
      http(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
