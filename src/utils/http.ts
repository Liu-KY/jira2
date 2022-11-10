import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = (
  endpoint: string,
  { token, data, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = qs.stringify(data);
  }
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        return Promise.reject({ message: "请重新登录" });
      }

      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { token: user?.token, ...config });
};
