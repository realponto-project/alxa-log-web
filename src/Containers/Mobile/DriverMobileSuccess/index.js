import React from 'react'
import { Image, Button, Row, Col, Typography } from 'antd'

import LogoSvg from '../../../Assets/logo.svg'
import PhoneUpdateSvg from './phone_update.svg'

const { Title, Text } = Typography

const DriverMobileSuccess = ({ goToDriverPage }) => {
  return (
    <Row style={{ padding: "16px" }} gutter={[8, 16]}>
      <Col span={24} style={{ textAlign: "center" }}>
        <Image 
          src={LogoSvg} 
          alt="logo" 
          preview={false} 
          width="161px"
          height="161px"
        />
      </Col>

      <Col span={24} style={{ textAlign: "center" }}>
        <Image 
          src={PhoneUpdateSvg} 
          alt="logo" 
          preview={false} 
          width="70%"
        />
      </Col>

      <Col span={24} style={{ textAlign: "center" }}>
        <Title level={5}>Obrigado por atualizar seu telefone!</Title>
        <Text>Agora bastar clicar no botão início, para começar suas atividades na filial!</Text>
      </Col>

      <Col span={24} style={{ textAlign: "center" }}>
        <Button
          type="primary"
          size="large"
          block
          onClick={goToDriverPage}
        >
          Início
        </Button>
      </Col>
    </Row>
  )
}

export default DriverMobileSuccess
