import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Kanban } from "../types/kanban";

export const useKanbans = (param: Partial<Kanban>) => {
  const http = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    http("kanbans", {
      data: param,
    })
  );
};
