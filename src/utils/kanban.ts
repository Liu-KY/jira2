import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "../types/kanban";
import { useAddConfig } from "./use-optimistic-options";

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
