import { User } from "screens/project-list/searchPanel";
import { useMount } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";

export const useUsers = () => {
  const { run, ...remain } = useAsync<User[]>();
  const http = useHttp();
  useMount(() => {
    run(http("users"));
  });
  return remain;
};
