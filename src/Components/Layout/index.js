import React, { useState } from "react";
import { Image, Menu, Layout, Typography } from "antd";
import { withRouter, useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { compose, pathOr } from "ramda";
import { useThemeSwitcher } from "react-css-theme-switcher";
import {
  DotChartOutlined,
  BranchesOutlined,
  ToolOutlined,
  CalculatorOutlined,
  TeamOutlined,
  CarOutlined,
  DiffOutlined,
} from "@ant-design/icons";

import Logo from "../../Assets/logo.svg";
import OnlyLogo from "../../Assets/bar_alxa.svg";
import styles from "./style.module.css";

const { Paragraph } = Typography;
const { Content, Footer, Header, Sider } = Layout;
const menuItems = [
  {
    icon: <DotChartOutlined />,
    label: "Resumo",
    key: "/logged/dashboard",
    urlRedirect: "/logged/dashboard",
  },
  {
    icon: <BranchesOutlined />,
    label: "Unidades",
    key: "/logged/branch",
    urlRedirect: "/logged/branch/manager",
  },
  {
    icon: <CalculatorOutlined />,
    label: "Operação",
    key: "/logged/operation",
    urlRedirect: "/logged/operation/manager",
  },
  {
    icon: <DiffOutlined />,
    label: "Tipo de veículos",
    key: "/logged/vehicle-type",
    urlRedirect: "/logged/vehicle-type/manager",
  },
  {
    icon: <TeamOutlined />,
    label: "Motorista",
    key: "/logged/driver",
    urlRedirect: "/logged/driver/manager",
  },
  {
    icon: <CarOutlined />,
    label: "Veículos",
    key: "/logged/vehicle",
    urlRedirect: "/logged/vehicle/manager",
  },
  {
    icon: <ToolOutlined />,
    label: "Manutenção",
    key: "/logged/maintenance",
    urlRedirect: "/logged/maintenance/manager",
  },
];

const LayoutComponent = ({ children, history, company }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentTheme } = useThemeSwitcher();
  let match = useRouteMatch("/logged/:slug");
  
  const goTo = history.push
  const companyName = pathOr("", ["name"], company);

  return (
    <Layout className={styles.noPrint}>
      <Sider
        className={styles.slider}
        theme={currentTheme}
        width={256}
        collapsible
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      >
        <div className={[styles.noPrint, styles.contentSidebar].join(" ")}>
          <Image
            className={[styles.noPrint, styles.imgLogo].join(" ")}
            preview={false}
            src={collapsed ? OnlyLogo : Logo}
            // width={collapsed ? 40 : 150}
            style={
              currentTheme === "dark" ? {
                filter: "invert(1)",
                width: collapsed ? 40 : 150
              } :{
                width: collapsed ? 40 : 150
              }
            }
          />
          <Paragraph
            className={[styles.noPrint, styles.companyName].join(" ")}
            style={{
              // display: collapsed ? "none" : "block",
              width: collapsed ? 0 : '100%',
            }}
          >
            {companyName}
          </Paragraph>
        </div>
        <Menu
          className={styles.noPrint}
          theme={currentTheme}
          mode="inline"
          selectedKeys={[match?.url ?? '']}
        >
          {menuItems.map((menuItem) => (
            <Menu.Item
              {...menuItem}
              className={styles.noPrint}
              key={menuItem.key}
              onClick={() => goTo(menuItem.urlRedirect)}
            >
              {menuItem.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 80 : 256,
          width: `calc(100vw - ${collapsed ? "80" : "256"}px)`,
        }}
        className={styles.siteLayout}
      >
        <Content
          style={{
            overflow: "initial",
          }}
        >
          {children || "Nenhum conteúdo criado!"}
        </Content>
      </Layout>
    </Layout>
  );
};

const mapStateToProps = ({ company }) => ({
  company,
});

const enhanced = compose(connect(mapStateToProps), withRouter);

export default enhanced(LayoutComponent);
