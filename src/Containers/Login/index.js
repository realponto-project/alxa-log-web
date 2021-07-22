import React from 'react'
import { Button, Col, Form, Image, Input, Row, Typography } from 'antd'

import onlineResume from '../../Assets/onlineResume.svg'
import logo from '../../Assets/logo.svg'
import styles from './style.module.css'

const { Paragraph } = Typography
const rules = [{ required: true, message: 'Campo obrigatório!' }]

const Login = ({
  authentication,
  isVisibleMessageError,
  loading,
  isMobile,
}) => {
  const onFinish = (values) => {
    authentication(values)
  }

  return (
    <Row gutter={10} style={{ height: '100vh', margin: 0 }} align="middle">
      { !isMobile && (
        <Col span={16}>
          <div className={styles.contentPublicity}>
            <Row style={{ height: '100%' }} align="middle">
              <Col>
                <Row justify="center" gutter={[0, 80]}>
                  <Image width={362} src={onlineResume} preview={false} />
                </Row>
                <Row justify="center">
                  <h1 className={styles.title}>Conheça o alxa dashboard!</h1>
                </Row>
                <Row justify="center">
                  <Col span={16}>
                    <Paragraph style={{ textAlign: 'center' }}>
                      Gestão de verdade para o seu négocio, fácil, rápido e preço
                      justo, com o alxa, você tem ao seu alcance, gestão de
                      clientes, véiculos, manutenção e muito mais!
                    </Paragraph>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Col>
      )}

      <Col span={isMobile ? 24 : 8}>
        <Row justify="center" gutter={[0, 87]}>
          <Image width={160} src={logo} preview={false} />
        </Row>

        <Row justify="center">
          <Col span={20}>
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item label="CPF" name="document" rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Senha" name="password" rules={rules}>
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  loading={loading}
                  size="large"
                  type="primary"
                  style={{ width: '100%', marginTop: 35 }}>
                  Acessar
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>

        {isVisibleMessageError && (
          <Row justify="center">
            <Paragraph style={{ textAlign: 'center', color: 'red' }}>
              CPF ou senha incorretos. Confira-os.
            </Paragraph>
          </Row>
        )}
      </Col>
    </Row>
  )
}

export default Login
