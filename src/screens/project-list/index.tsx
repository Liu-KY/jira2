import { List } from "./list";
import { SearchPanel } from "./searchPanel";
import { useEffect, useState } from "react";
import { cleanObject, useMount, useDebounce } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
const apiUrl = process.env.REACT_APP_API_URL;

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
    // fetch(`${apiUrl}/users`).then(async (response) => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });

  //获取列表
  useEffect(() => {
    http(`projects?${qs.stringify(cleanObject(debounceParam))}`).then(setList);
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    // ).then(async (response) => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });
  }, [debounceParam]);

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  );
};
