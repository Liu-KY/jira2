import { useState } from "react";

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

export const useAsync = <D>(
  initialState?: State<D>,
  initialConfig?: typeof defaultConfig
) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });
  const config = {
    ...defaultConfig,
    ...initialConfig,
  };
  const [retry, setRetry] = useState(() => () => {});

  const setError = (error: Error) =>
    setState({ error, data: null, stat: "error" });

  const setData = (data: D) => setState({ data, stat: "success", error: null });

  const run = (
    promise: Promise<D>,
    runConfig?: { retry: () => Promise<D> }
  ) => {
    if (!promise || !promise.then) throw new Error("请传入promise对象");
    setState({ ...state, stat: "loading" });

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
  };

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
//     stat: "idle" | "loading" | "error" | "success";
