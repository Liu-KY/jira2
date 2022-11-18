import { useCallback, useMemo, useReducer, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: null | Error;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  error: null,
  data: null,
  stat: "idle",
};

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  //时候刷新
  const config = useMemo(
    () => ({
      ...defaultConfig,
      ...initialConfig,
    }),
    [initialConfig]
  );
  //刷新
  const [retry, setRetry] = useState(() => () => {});
  //状态数据
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({
      ...state,
      ...action,
    }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  );
  //判断组件是否在更新
  const safeDispatch = useSafeDispatch(dispatch);

  const setError = useCallback(
    (error: Error) => safeDispatch({ error, data: null, stat: "error" }),
    [safeDispatch]
  );

  const setData = useCallback(
    (data: D) => safeDispatch({ data, stat: "success", error: null }),
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) throw new Error("请传入promise对象");

      safeDispatch({ stat: "loading" });

      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig.retry(), runConfig);
        }
      });

      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) return Promise.reject(error);
          return error;
        });
    },
    [setError, setData, config, safeDispatch]
  );

  return {
    isError: state.stat === "error",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isIdle: state.stat === "idle",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
