import { ReactNode, useCallback } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/searchPanel";
import { useMount } from "utils";
import { useAsync } from "utils/useAsync";
import { ErrorFullPafe, LoadingFullPafe } from "components/lib";
import * as authStore from "store/modules/auth";
import { useAppDispatch, useAppSelector } from "store";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { run, error, isLoading, isError, isIdle } = useAsync<User | null>();

  const dispatch: (...args: unknown[]) => Promise<User> = useAppDispatch();

  useMount(() => {
    run(dispatch(authStore.bootstrap()));
  });

  if (isLoading || isIdle) {
    return <LoadingFullPafe />;
  }

  if (isError) {
    return <ErrorFullPafe error={error} />;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const user = useAppSelector(authStore.selectUser);

  const dispatch: (...args: unknown[]) => Promise<User> = useAppDispatch();

  const login = useCallback(
    async (form: auth.UserData) => dispatch(authStore.login(form)),
    [dispatch]
  );

  const register = useCallback(
    async (form: auth.UserData) => dispatch(authStore.register(form)),
    [dispatch]
  );

  const logout = useCallback(
    async () => dispatch(authStore.logout()),
    [dispatch]
  );

  return {
    user,
    login,
    register,
    logout,
  };
};
