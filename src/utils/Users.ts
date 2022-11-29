import { cleanObject } from "utils";
import { useHttp } from "./http";
import { User } from "../types/user";
import { useQuery } from "react-query";

export const useUsers = (params?: Partial<User>) => {
  const http = useHttp();

  return useQuery<User[]>(["users", params], () =>
    http("users", { data: cleanObject(params || {}) })
  );
};
