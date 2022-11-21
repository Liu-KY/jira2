import { useMount } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { User } from "../types/user";

export const useUsers = () => {
  const { run, ...remain } = useAsync<User[]>();
  const http = useHttp();
  useMount(() => {
    run(http("users"));
  });
  return remain;
};
