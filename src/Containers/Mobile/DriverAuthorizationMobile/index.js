import React from 'react'
import { Button, Col, Form, Image, Input, Row, Typography } from 'antd'

import Logo from '../../../Assets/logo.svg'

const { Text } = Typography

const DriverAuthorizationMobile = ({ handleSubmit }) => {
  return (
    <Form onFinish={handleSubmit}>
      <Row justify="center" align="middle" gutter={[0, 30]}>
        <Col span={24}>
          <Row justify="center" align="middle">
            <Image
              alt="logo"
              src={Logo}
              width="161px"
              height="161px"
              preview={false}
            />
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="center" align="middle">
            <Text style={{ color: '#8E8D92' }} level={4}>
              Informe a placa do veículo que irá ficar estacionado ou retirado
              da filial.
            </Text>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="center" align="middle">
            <Form.Item style={{ width: '80%' }} name="plate">
              <Input
                size="large"
                placeholder="PLACA"
                style={{ textAlign: 'center' }}
              />
            </Form.Item>
          </Row>
        </Col>
        <Col span={24}>
          <Row justify="center" align="middle">
            <Form.Item style={{ width: '80%' }}>
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                style={{ width: '100%' }}>
                Buscar autorização
              </Button>
            </Form.Item>
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default DriverAuthorizationMobile
