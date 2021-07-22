import React from 'react'
import { Row, Col } from 'antd'
import { Switch } from 'react-router-dom'

import ProtectedRoute from '../../Routes/protectedRoute'
import rootRoutes from '../../Routes/root'
import Header from '../../Components/Header'
import Layout from '../../Components/Layout'
import testMobile from '../../utils/isMobile'

const isMobile = window.mobileCheck() || testMobile ? true : false

const renderRoute = (route) => <ProtectedRoute key={route.path} {...route} />

export const Logged = () => (
  window.mobileCheck() || testMobile
    ? (
      <Switch>{rootRoutes.map(renderRoute)}</Switch>
    ) 
    : (
        <Layout>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Header rootRoutes={rootRoutes} />
          </Col>
          <Col span={24}>
            <Switch>{rootRoutes.map(renderRoute)}</Switch>
          </Col>
        </Row>
      </Layout>
    )
)

export default Logged
