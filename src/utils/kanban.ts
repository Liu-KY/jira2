import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

export const useKanbans = (param: Partial<Kanban>) => {
  const http = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    http("kanbans", {
      data: param,
    })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      http(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const http = useHttp();

  return useMutation(
    (id: number) =>
      http(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
