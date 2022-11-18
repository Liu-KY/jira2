import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject, subset } from "utils";

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [serchParams, setSerchParams] = useSearchParams();
  // console.log('Object.fromEntries(searchParams)', Object.fromEntries(serchParams), serchParams)
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(serchParams), keys) as { [key in K]: string },
      [serchParams, keys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(serchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSerchParams(o);
    },
  ] as const;
};
