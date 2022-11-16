/* @jsxImportSource @emotion/react */
import { Form, Input } from "antd";
import { UserSelect } from "components/userSelect";
import { Project } from "./list";

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  param: Pick<Project, "name" | "personId">;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          value={param.name}
          onChange={(ev) => {
            setParam({ ...param, name: ev.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          onChange={(value) => {
            setParam({ ...param, personId: value });
          }}
          defaultOptionName={"负责人"}
        />
      </Form.Item>
    </Form>
  );
};
