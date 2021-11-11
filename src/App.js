import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConfigProvider, Empty, Image } from 'antd'
import { ThemeSwitcherProvider } from 'react-css-theme-switcher'
import { connect } from 'react-redux'
import { compose, isEmpty } from 'ramda'
import ptBR from 'antd/lib/locale/pt_BR'
import 'leaflet/dist/leaflet.css'

import MaintenanceQrcode from './Pages/Mobile/MaintenanceQrcode'
import DriverAuthorizationQrcode from './Pages/Mobile/DriverQrcodeAuthorization'
import MobileDriver from './Pages/Mobile/DriverMobile'
import MobileDriverSuccess from './Pages/Mobile/DriverMobileSuccess'

import Login from './Pages/Login'
import Logged from './Pages/Logged'
import NoData from './Assets/noData.svg'

const themes = {
  dark: `${process.env.PUBLIC_URL}/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/light-theme.css`
}

const App = ({ theme, user }) => {
  return (
    <ThemeSwitcherProvider
      themeMap={themes}
      defaultTheme={isEmpty(user) ? 'light' : theme}>
      <ConfigProvider
        locale={ptBR}
        renderEmpty={() => (
          <Empty
            description="Não há dados"
            image={
              <Image
                style={theme === 'dark' && { filter: 'invert(1)' }}
                width={85}
                src={NoData}
                preview={false}
              />
            }
          />
        )}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/mobile-driver/:id" component={MobileDriver} />
          <Route
            path="/mobile-driver-success/:id"
            component={MobileDriverSuccess}
          />
          <Route
            path="/authorization-qrcode"
            component={DriverAuthorizationQrcode}
          />
          <Route
            path="/mobile-qrcode-detail/:id"
            component={MaintenanceQrcode}
          />
          <Route path="/logged" component={Logged} />
          <Redirect from="*" to="/login" />
        </Switch>
      </ConfigProvider>
    </ThemeSwitcherProvider>
  )
}

const mapStateToProps = ({ theme, user }) => ({
  theme,
  user
})

const enhanced = compose(connect(mapStateToProps))

export default enhanced(App)
