import React, { useState } from "react";
import { Image, Menu, Layout, Typography } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose, pathOr } from "ramda";
import { useThemeSwitcher } from "react-css-theme-switcher";
import {
  DotChartOutlined,
  BranchesOutlined,
  ToolOutlined,
  CalculatorOutlined,
  TeamOutlined,
  CarryOutOutlined,
  CarOutlined,
  DiffOutlined,
} from "@ant-design/icons";

import Logo from "../../Assets/logo.svg";
import OnlyLogo from "../../Assets/bar_alxa.svg";
import LogoPlus from "../../Assets/alxa-plus.svg";
import styles from "./style.module.css";

const { Paragraph } = Typography
const { Sider, Content } = Layout;
const menuItems = [
  {
    icon: <DotChartOutlined />,
    label: "Resumo",
    key: "/logged/dashboard",
  },
  {
    icon: <BranchesOutlined />,
    label: "Unidades",
    key: "/logged/branch/manager",
  },
  {
    icon: <CalculatorOutlined />,
    label: "Operação",
    key: "/logged/operation/manager",
  },
  {
    icon: <DiffOutlined />,
    label: "Tipo de veículos",
    key: "/logged/vehicle-type/manager",
  },
  {
    icon: <TeamOutlined />,
    label: "Motorista",
    key: "/logged/driver/manager",
  },
  {
    icon: <CarOutlined />,
    label: "Veículos",
    key: "/logged/vehicle/manager",
  },
  {
    icon: <ToolOutlined />,
    label: "Manutenção",
    key: "/logged/maintenance/manager",
  },
];

const LayoutComponent = ({ children, history, company }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentTheme } = useThemeSwitcher();


  const goTo = ({ key }) => history.push(key);
  const companyName = pathOr("", ["name"], company);
  const parseCompanyName =
    companyName.length > 22 ? `${companyName.substr(0, 22)}...` : companyName;

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
        <div
          style={{
            padding: "48px 0 24px 24px",
            margin: "auto",
          }}
          className={styles.noPrint}
        >
          <Image
            className={[styles.noPrint, styles.imgLogo].join(' ')}
            preview={false}
            src={collapsed ? OnlyLogo : Logo}
            width={collapsed ? 40 : 150}
            style={currentTheme === 'dark' && { 
              filter: 'invert(1)'
            }}
          />
            <Paragraph
              className={[styles.noPrint, styles.companyName].join(' ')}
              style={{
                display: collapsed ? 'none' : "block",
              }}
            >
              {parseCompanyName}
            </Paragraph>
        </div>
        <Menu
          className={styles.noPrint}
          theme={currentTheme}
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          {menuItems.map((menuItem) => (
            <Menu.Item
              className={styles.noPrint}
              {...menuItem}
              key={menuItem.key}
              onClick={goTo}
            >
              {menuItem.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: 16,
            minHeight: "100vh",
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
