import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "../types/task";
import { useAddConfig } from "./use-optimistic-options";

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
