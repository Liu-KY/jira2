import { useUsers } from "utils/Users";
import { IdSelect } from "./idSelect";

type UserSelectProps = Omit<React.ComponentProps<typeof IdSelect>, "options">;

export const UserSelect = (props: UserSelectProps) => {
  const { data: users } = useUsers();
  return <IdSelect {...props} options={users || []} />;
};
