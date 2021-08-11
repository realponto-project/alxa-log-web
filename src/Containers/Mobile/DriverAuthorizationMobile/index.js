import React from 'react'
import { Button, Col, Form, Image, Input, Row, Typography } from 'antd'

import Logo from '../../../Assets/logo.svg'

const { Text, Title } = Typography

const DriverAuthorizationMobile = ({ handleSubmit }) => {
  return (
    <Form onFinish={handleSubmit}>
      <Row style={{ padding: "16px" }} gutter={[8, 8]}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Image
            alt="logo"
            src={Logo}
            width="161px"
            height="161px"
            preview={false}
          />
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <Title level={4}>
            Buscar autorização de acesso!
            </Title>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <Text style={{ color: '#8E8D92' }} level={4}>
            Informe a placa do veículo que irá ficar estacionado ou retirado
            da filial.
            </Text>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <Form.Item name="plate">
            <Input
              size="large"
              placeholder="PLACA"
              style={{ textAlign: 'center' }}
            />
          </Form.Item>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              size="large"
              block
            >
              Buscar autorização
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default DriverAuthorizationMobile
