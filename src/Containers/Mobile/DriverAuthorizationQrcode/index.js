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
          padding: '35px 15px 15px 0',
          height: '290px',
          margin: '0',
          borderRadius: '11px',
          textAlign: 'center'
        }}>
        <Row>
          <Col span={24}>
            <Title style={{ padding: '0', margin: '0' }} level={5}>
              {driver.name}
            </Title>
            <p style={{ color: '#8E8D92' }}>Autorização alxa log</p>
          </Col>
          <Col span={24}>
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
        </Row>
      </Col>

      <Col span={24}>
        <Text>
          Este é o seu Qr code de autorização, apresente o Qr code do veículo
          que está dirigindo ou retirando
        </Text>
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
