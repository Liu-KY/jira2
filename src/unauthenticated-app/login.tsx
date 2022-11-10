import { FormEvent } from "react";
import { useAuth } from "context/auth-context";

export const Login = () => {
  const { login } = useAuth();
  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const username = (ev.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (ev.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={"username"} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={"password"} />
      </div>
      <div>
        <button type={"submit"}>登录</button>
      </div>
    </form>
  );
};
