import React, { ReactNode, useContext } from "react";
import * as auth from "auth-provider";
import { useMount } from "utils";
import { http } from "utils/http";
import { useAsync } from "utils/useAsync";
import { ErrorFullPafe, LoadingFullPafe } from "components/lib";
import { useQueryClient } from "react-query";
import { User } from "../types/user";

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (AuthForm: auth.UserData) => Promise<void>;
      register: (AuthForm: auth.UserData) => Promise<void>;
      logout: () => void;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    error,
    data: user,
    isLoading,
    isError,
    setData: setUser,
    isIdle,
  } = useAsync<User | null>();

  const queryClient = useQueryClient();
  const login = (AuthForm: auth.UserData) => auth.login(AuthForm).then(setUser);
  const register = (AuthForm: auth.UserData) =>
    auth.register(AuthForm).then(setUser);

  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  useMount(() => {
    run(bootstrapUser());
  });

  if (isLoading || isIdle) {
    return <LoadingFullPafe />;
  }

  if (isError) {
    return <ErrorFullPafe error={error} />;
  }
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
