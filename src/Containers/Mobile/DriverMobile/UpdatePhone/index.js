import React from 'react'
import { Image, Button, Typography, Row, Col, Form, Input } from 'antd'

import LogoSvg from '../../../../Assets/logo.svg'
import { customerMask } from '../../../../utils/Masks'

const { Text } = Typography

const onValuesChange = (form) => (_, { phone }) => {
  const { value } = customerMask({ name: 'phone', value: phone })

  form.setFieldsValue({ phone: value })
}

const rules = [
  {
    required: true,
    message: 'Este campo é obrigatório!',
    validateTrigger: ['onBlur']
  },
  {
    pattern: /^\(\d{2}\)\s\d{4,5}-\d{4}/,
    message: 'Número inválido',
    validateTrigger: ['onBlur']
  }
]

const UpdatePhone = ({ driver, updatePhone }) => {
  const [form] = Form.useForm()

  return (
    <Row style={{ padding: "16px" }} gutter={[0, 8]}>
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
        <Text>
          Olá <Text strong>{driver.name}</Text>,
          <br />Precisamos que você nos informe seu <Text strong>telefone</Text>.
        </Text>
      </Col>

      <Col span={24} style={{ textAlign: "center" }}>
        <Form
          layout="vertical"
          form={form}
          onFinish={updatePhone}
          onValuesChange={onValuesChange(form)}
        >
          <Form.Item
            name="phone"
            label="Telefone"
            rules={rules}
            validateTrigger={['onBlur', 'onChange']}>
            <Input size="large" />
          </Form.Item>
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              size="large"
              block
            >
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default UpdatePhone
