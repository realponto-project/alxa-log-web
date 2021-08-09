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

      <Col span={24}>
        <Text>
          Olá <Text strong>{driver.name}</Text>,
        </Text>
        <br />
        <Text>Precisamos que você nos informe seu telafone.</Text>
      </Col>

      <Form
        layout="vertical"
        form={form}
        onFinish={updatePhone}
        style={{ width: '100%' }}
        onValuesChange={onValuesChange(form)}>
        <Form.Item
          name="phone"
          label="Telefone"
          rules={rules}
          validateTrigger={['onBlur', 'onChange']}>
          <Input size="large" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </Row>
  )
}

export default UpdatePhone
