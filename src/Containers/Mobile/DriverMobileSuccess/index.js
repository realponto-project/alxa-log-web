import React from 'react'
import { Image, Button, Row, Col, Typography } from 'antd'

import LogoSvg from '../../../Assets/logo.svg'

const { Title } = Typography

const DriverMobileSuccess = ({ goToDriverPage }) => {
  return (
    <Row
      style={{
        background: '#F2F2F3',
        padding: '35px 35px',
        minHeight: '100vh',
        textAlign: 'center'
      }}>
      <Col span={24}>
        <Image src={LogoSvg} alt="logo" preview={false} width={200} />
      </Col>

      <Col
        span={24}
        style={{
          background: '#FFFF',
          height: '150px',
          padding: '35px 15px 15px 0',
          borderRadius: '10px',
          textAlign: 'center'
        }}>
        <Title>Sucesso</Title>
      </Col>

      <Col span={24}>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          block
          onClick={goToDriverPage}>
          Início
        </Button>
      </Col>
    </Row>
  )
}

export default DriverMobileSuccess
