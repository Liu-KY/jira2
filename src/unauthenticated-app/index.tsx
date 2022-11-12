import { Button, Card, Divider, Typography } from "antd";
import { useState } from "react";
import { Login } from "./login";
import { Register } from "./register";
import styled from "@emotion/styled";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";

export const Unauthenticated = () => {
  const [toggle, setToggle] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  return (
    <Container>
      <Header />
      <Background />

      <ShadowCard>
        <Title>{toggle ? "请登录" : "请注册"}</Title>
        {error && (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        )}
        {toggle ? (
          <Login setError={setError} />
        ) : (
          <Register setError={setError} />
        )}
        <Divider />
        <Button type={"link"} onClick={() => setToggle(!toggle)}>
          去{toggle ? "没有账号? 去注册" : "有账号了？去登录"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  background: url(${logo}) no-repeat center;
  width: 100%;
  padding: 5rem 0;
  background-size: 8rem;
`;
const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${left}) url(${right});
  background-position: left bottom, right bottom;
  background-attachment: fixed;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
  background-repeat: no-repeat;
`;
const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
  border-radius: 0.3rem;
  box-sizing: border-box;
`;
export const LongButton = styled(Button)`
  width: 100%;
`;
