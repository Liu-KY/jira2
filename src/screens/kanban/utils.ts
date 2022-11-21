import { useParams } from "react-router";
import { useProject } from "../../utils/Project";
import { useMemo } from "react";
import { useUrlQueryParam } from "../../utils/url";
import { useDebounce } from "utils";

export const useProjectIdInUrl = () => {
  const { projectId } = useParams();
  // const {pathname} = useLocation()
  // const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(projectId);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() });
export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tageId",
  ]);
  const projectId = useProjectIdInUrl();
  const debouncedName = useDebounce(param.name, 200);

  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tageId: Number(param.tageId) || undefined,
      name: debouncedName,
      setParam,
    }),
    [debouncedName, param, projectId, setParam]
  );
};
export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
