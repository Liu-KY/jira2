import { IdSelect } from "./idSelect";
import React from "react";
import { useTaskTypes } from "../utils/task-type";

type UserSelectProps = Omit<React.ComponentProps<typeof IdSelect>, "options">;

export const TaskSelect = (props: UserSelectProps) => {
  const { data: tasks } = useTaskTypes();
  return <IdSelect {...props} options={tasks || []} />;
};
