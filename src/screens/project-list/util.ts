import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(
    useMemo(() => ["name", "personId"], [])
  );
  return [
    useMemo(
      () => ({
        name: param.name,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};

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
