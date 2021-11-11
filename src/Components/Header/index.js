import React, { useState } from 'react'
import {
  PageHeader,
  Button,
  Menu,
  Dropdown,
  Row,
  Col,
  Switch as AntSwitch
} from 'antd'
import {
  BulbFilled,
  BulbOutlined,
  BulbTwoTone,
  DownOutlined,
  LeftOutlined
} from '@ant-design/icons'
import { Switch, Route, withRouter } from 'react-router-dom'
import { useThemeSwitcher } from 'react-css-theme-switcher'

import { connect } from 'react-redux'
import { compose } from 'ramda'
import styles from './style.module.css'
import { SET_DARK_THEME, SET_LIGHT_THEME } from '../../Redux/actions/theme'

const Header = ({
  rootRoutes,
  history,
  loggoutUser,
  user,
  unSubscribe,
  setDarkTheme,
  setLightTheme,
  theme
}) => {
  const { switcher, currentTheme, status, themes } = useThemeSwitcher()
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark')

  const toggleTheme = (isChecked) => {
    setIsDarkMode(isChecked)
    switcher({ theme: isChecked ? themes.dark : themes.light })
    if (isChecked) {
      setDarkTheme()
    } else {
      setLightTheme()
    }
  }

  const handleNavegator = ({ key }) => {
    if (key === 'theme') return

    if (key === 'loggout') {
      localStorage.removeItem('token')
      localStorage.removeItem('user.name')
      loggoutUser()
      unSubscribe()
      history.push('/login')
    }

    return history.push(key)
  }

  const menu = (
    <Menu onClick={handleNavegator} style={{ width: 300 }}>
      {/* <Menu.Item key="/logged/account-myinfo">Dados cadastrais</Menu.Item> */}
      <Menu.Item key="/logged/account-myteam">
        Gerenciamento de equipe
      </Menu.Item>
      <Menu.Item key="/logged/account-password">Alterar senha</Menu.Item>
      <Menu.Item key="theme">
        <Row justify="space-between">
          <p>
            Tema <em>(beta)</em>
          </p>
          <AntSwitch
            checkedChildren={<BulbFilled style={{ color: 'black' }} />}
            unCheckedChildren={<BulbTwoTone twoToneColor="yellow" />}
            size="small"
            checked={isDarkMode}
            onChange={toggleTheme}
          />
        </Row>
      </Menu.Item>
      <Menu.Item key="loggout">Sair</Menu.Item>
    </Menu>
  )

  const renderHeader = (props) => () => (
    <Row className={styles.noPrint}>
      <Col span={12}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {
            <Button
              icon={<LeftOutlined />}
              onClick={history.goBack}
              type="link"
              disabled={!props.goBack}
              style={{
                opacity: props.goBack ? 1 : 0,
                cursor: props.goBack ? 'pointer' : 'default'
              }}
            />
          }
          <h1
            style={{
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '32px',
              marginBottom: 0
            }}>
            {props.title}
          </h1>
        </div>
      </Col>
      <Col span={12} style={{ textAlign: 'right' }}>
        <Dropdown
          key="1"
          overlay={menu}
          trigger={['click']}
          onClick={(e) => e.preventDefault()}>
          <Button type="link" style={{ fontSize: '14px' }}>
            {user.name || 'Minha Conta'} <DownOutlined />
          </Button>
        </Dropdown>
      </Col>
    </Row>
  )

  const renderRoute = (route) => (
    <Route key={route.path} {...route} component={renderHeader(route)} />
  )

  return (
    <PageHeader style={{ padding: '0 0 16px 0' }}>
      <Switch>{rootRoutes.map(renderRoute)}</Switch>
    </PageHeader>
  )
}

const mapStateToProps = ({ user, theme }) => ({
  user,
  theme
})

const mapDispatchToProps = (dispatch) => ({
  loggoutUser: () => dispatch({ type: 'USER_LOGOUT' }),
  unSubscribe: () => dispatch({ type: 'UNSET_SUBSCRIPTION' }),
  setDarkTheme: () => dispatch({ type: SET_DARK_THEME }),
  setLightTheme: () => dispatch({ type: SET_LIGHT_THEME })
})

const enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withRouter
)

export default enhanced(Header)
