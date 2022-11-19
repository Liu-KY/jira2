import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";
import { useProject } from "utils/Project";
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
  const [{ projectCreate, editingProjectId }, setUrlParams] = useUrlQueryParam([
    "projectCreate",
    "editingProjectId",
  ]);

  const open = () => setUrlParams({ projectCreate: true });
  const close = () =>
    setUrlParams({ projectCreate: undefined, editingProjectId: undefined });
  const startEdit = (id: number) => setUrlParams({ editingProjectId: id });

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  return {
    projectCreate: projectCreate === "true" || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  };
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectsSearchParams();
  return ["projects", params];
};
