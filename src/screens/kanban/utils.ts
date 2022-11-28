import { useParams } from "react-router";
import { useProject } from "../../utils/Project";
import { useCallback, useMemo } from "react";
import { useUrlQueryParam } from "../../utils/url";
import { useTask } from "../../utils/task";

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
  const [param] = useUrlQueryParam(["name", "typeId", "processorId", "tageId"]);
  const projectId = useProjectIdInUrl();

  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tageId: Number(param.tageId) || undefined,
      name: param.name,
    }),
    [param, projectId]
  );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    setEditingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading,
  };
};
