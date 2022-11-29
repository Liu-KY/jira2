import { useEpics } from "../utils/epic";
import { IdSelect } from "./idSelect";
import React from "react";

type UserSelectProps = Omit<React.ComponentProps<typeof IdSelect>, "options">;

export const EpicSelect = (props: UserSelectProps) => {
  const { data: epics } = useEpics();
  return <IdSelect options={epics || []} {...props}></IdSelect>;
};
