import { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";

export const Unauthenticated = () => {
  const [toggle, setToggle] = useState(true);

  return (
    <div>
      {toggle ? <Login /> : <Register />}
      <button onClick={() => setToggle(!toggle)}>
        去{toggle ? "注册" : "登录"}
      </button>
    </div>
  );
};
