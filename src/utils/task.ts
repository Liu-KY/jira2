import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Task } from "../types/task";

export const useTasks = (param?: Partial<Task>) => {
  const http = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    http("tasks", { data: param })
  );
};
