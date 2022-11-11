import { List } from "./list";
import { SearchPanel } from "./searchPanel";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreens = () => {
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debounceParam = useDebounce(param, 500);
  const http = useHttp();
  //获取用户信息
  useMount(() => {
    http("users").then(setUsers);
  });

  //获取列表
  useEffect(() => {
    http(`projects?${qs.stringify(cleanObject(debounceParam))}`).then(setList);
  }, [debounceParam]);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
