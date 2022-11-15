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
      [serchParams]
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

// /**
//  * 返回页面url中，指定键的参数值
//  */
//  export const useUrlQueryParam = <K extends string>(keys: K[]) => {
//     const [searchParams, setSearchParam] = useSearchParams();
//     return [
//       useMemo(
//         () =>
//           subset(Object.fromEntries(searchParams), keys) as {
//             [key in K]: string;
//           },
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//         [searchParams]
//       ),
//       (params: Partial<{ [key in K]: unknown }>) => {
//         // iterator
//         // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
//         const o = cleanObject({
//           ...Object.fromEntries(searchParams),
//           ...params,
//         }) as URLSearchParamsInit;
//         return setSearchParam(o);
//       },
//     ] as const;
//   };
