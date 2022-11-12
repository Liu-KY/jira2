import { useAuth } from "context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/useAsync";

export const Login = ({ setError }: { setError: (error: Error) => void }) => {
  const { login } = useAuth();
  const { run } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async (value: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(value));
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
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
