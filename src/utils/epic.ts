import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "../types/epic";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useEpics = (param?: Partial<Epic>) => {
  const http = useHttp();

  return useQuery<Epic[]>(["epics", param], () =>
    http("epics", {
      data: param,
    })
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (id: number) =>
      http(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (params: Partial<Epic>) =>
      http(`epics`, {
        method: "POST",
        data: params,
      }),
    useAddConfig(queryKey)
  );
};
