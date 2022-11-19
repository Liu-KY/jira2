import { Dropdown, Table, TableProps } from "antd";
import { User } from "./searchPanel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";

import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./util";
import { useEditProject } from "../../utils/Project";

export interface Project {
  id: number;
  name: string;
  personId: number | undefined;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  const { open } = useProjectModal();

  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{value}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          dataIndex: "personId",
          render(value) {
            return (
              <span>
                {users.find((user) => user.id === value)?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          dataIndex: "created",
          render(value) {
            return (
              <span>{value ? dayjs(value).format("YYYY-MM-DD") : "无"}</span>
            );
          },
        },
        {
          render() {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      label: (
                        <ButtonNoPadding onClick={open} type={"link"}>
                          编辑
                        </ButtonNoPadding>
                      ),
                      key: "edit",
                    },
                  ],
                }}
              >
                <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
              </Dropdown>
            );
          },
        },
      ]}
      {...props}
    />
  );
};
