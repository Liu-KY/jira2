import { Form, Input } from "antd";
import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/useAsync";

export const Register = ({
  setError,
}: {
  setError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  const { run } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...value
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== value.password) {
      setError(new Error("两次输入的密码不一致"));
      return;
    }
    try {
      run(register(value));
    } catch (e: any) {
      setError(e);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type="text" id={"username"} placeholder={"用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input
          type="password"
          id={"password"}
          placeholder={"密码"}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input
          type="password"
          id={"cpassword"}
          placeholder={"确认密码"}
          autoComplete="off"
        />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
