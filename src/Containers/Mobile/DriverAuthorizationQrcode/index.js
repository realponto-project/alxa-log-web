import React from 'react'
import { Image, Button, Typography, Row, Col } from 'antd'
import LogoSvg from '../../../Assets/logo.svg'
import Qrcode from 'qrcode.react'

const { Text, Title } = Typography

const DriverAuthorizationQrcode = ({
  plate,
  driver,
  authorizationId,
  restart
}) => {
  return (
    <Row
      style={{
        background: '#F2F2F3',
        minHeight: '100vh',
        textAlign: 'center',
        padding: '63px 16px 16px 16px'
      }}>
      <Col span={24}>
        <Image src={LogoSvg} alt="logo" preview={false} width="161px" />
      </Col>
      <Col span={24}>
        <div
          style={{
            background: '#FFF',
            padding: '15px',
            borderRadius: '11px'
          }}>
          <Row>
            <Col span={24}>
              <Title level={5}>{driver.name}</Title>
              <p style={{ color: '#8E8D92' }}>Autorização alxa log</p>
            </Col>
            <Col span={24}>
              {}
              <Qrcode
                value={JSON.stringify({
                  plate: plate,
                  origin: 'authorization',
                  authorizationId
                })}
              />
            </Col>
            <Col span={24}>
              <Title level={3}>{plate}</Title>
            </Col>
            <Col span={24}>
              <Text>
                Este é o seu Qr code de autorização, apresente o Qr code do
                veículo que está dirigindo ou retirando
              </Text>
            </Col>
          </Row>
        </div>
      </Col>

      <Col span={24}>
        <Button
          onClick={restart}
          type="primary"
          size="large"
          htmlType="submit"
          block>
          Voltar
        </Button>
      </Col>
    </Row>
  )
}

export default DriverAuthorizationQrcode
