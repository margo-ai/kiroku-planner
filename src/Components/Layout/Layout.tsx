import { Layout as Container } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import { Outlet } from "react-router-dom";

import st from "./Layout.module.scss";

export const Layout = () => {
  return <Container className={st.container}></Container>;
};
