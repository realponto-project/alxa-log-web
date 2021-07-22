import React from 'react'
import { Image, Menu, Layout } from 'antd'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose, pathOr } from 'ramda'
import Logo from '../../Assets/logo.svg'
import LogoPlus from '../../Assets/alxa-plus.svg'
import styles from './style.module.css'

import {
  DotChartOutlined,
  BranchesOutlined,
  ToolOutlined,
  CalculatorOutlined,
  TeamOutlined,
  CarryOutOutlined,
  DiffOutlined
} from '@ant-design/icons'

const { Sider, Content } = Layout
const menuItems = [
  {
    icon: <DotChartOutlined />,
    label: 'Resumo',
    key: '/logged/dashboard'
  },
  {
    icon: <BranchesOutlined />,
    label: 'Unidades',
    key: '/logged/branch/manager'
  },
  {
    icon: <CalculatorOutlined />,
    label: 'Operação',
    key: '/logged/operation/manager'
  },
  {
    icon: <DiffOutlined />,
    label: 'Tipo de veículos',
    key: '/logged/vehicle-type/manager'
  },
  {
    icon: <TeamOutlined />,
    label: 'Motorista',
    key: '/logged/driver/manager'
  },
  {
    icon: <CarryOutOutlined />,
    label: 'Veículos',
    key: '/logged/vehicle/manager'
  },
  {
    icon: <ToolOutlined />,
    label: 'Manutenção',
    key: '/logged/maintenance/manager'
  },
]

const LayoutComponent = ({ children, history, company }) => {
  const goTo = ({ key }) => history.push(key)
  const companyName = pathOr('', ['name'], company)
  const parseCompanyName = companyName.length > 22 ? `${companyName.substr(0, 22)}...` : companyName

  return (
    <Layout className={styles.noPrint}>
      <Sider
        className={styles.noPrint}
        theme="light"
        collapsible
        collapsed={false}
        width={256}
        trigger={null}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0
        }}>
        <div
          style={{
            padding: '24px 0 24px 24px',
            margin: 'auto'
          }}
          className={styles.noPrint}
        >
          <Image
            className={styles.noPrint}
            style={{
              position: 'relative',
              width: '150px',
              height: '79px',
              margin: 'auto'
            }}
            preview={false}
            width={220}
            src={Logo}
          />
          <p
            className={styles.noPrint}
            style={{
              color: '#454550',
              fontSize: '18px',
              fontWeight: 'bold',
            }}
            title={parseCompanyName}
          >
            {parseCompanyName}
          </p>
        </div>
        <Menu
          className={styles.noPrint}
          theme="ligth"
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ width: 256 }}>
          {menuItems.map((menuItem) => (
            <Menu.Item className={styles.noPrint} {...menuItem} key={menuItem.key} onClick={goTo}>
              {menuItem.label}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            marginLeft: '256px',
            padding: 16,
            minHeight: '100vh'
          }}>
          {children || 'Nenhum conteúdo criado!'}
        </Content>
      </Layout>
    </Layout>
  )
}

const mapStateToProps = ({ company }) => ({
  company,
})

const enhanced = compose(connect(mapStateToProps), withRouter)

export default enhanced(LayoutComponent)
