import { useCallback, useEffect } from "react";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { useUrlQueryParam } from "./url";

export const useProject = (params?: Partial<Project>) => {
  const { run, ...remain } = useAsync<Project[]>();
  const http = useHttp();
  const async = useCallback(
    () => http("projects", { data: cleanObject(params || {}) }),

    [http, params]
  );

  useEffect(() => {
    run(async(), { retry: async });
  }, [params, run, async]);
  return remain;
};

export const useEditProjec = () => {
  const { run, ...remain } = useAsync<Project[]>();
  const http = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      http(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };

  return {
    mutate,
    ...remain,
  };
};

// export const useAddProjec = () => {
//     const {run, ...remain} = useAsync<Project[]>();
//     const http = useHttp();
//     const mutate = (params: Partial<Project>) => {
//         run(
//             http(`projects/${params.id}`, {
//                 data: params,
//                 method: "POST",
//             })
//         );
//     };
//
//     return {
//         mutate,
//         ...remain,
//     };
// };

export const useProjectModal = () => {
  const [{ projectCreate }, setUrlParams] = useUrlQueryParam(["projectCreate"]);

  const open = () => setUrlParams({ projectCreate: true });
  const close = () => setUrlParams({ projectCreate: undefined });

  return {
    projectCreate: projectCreate === "true",
    open,
    close,
  };
};
