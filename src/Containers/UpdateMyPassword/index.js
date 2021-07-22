/* eslint-disable prefer-promise-reject-errors */
import React from 'react'
import { Row, Col, Card, Input, Button, Form } from 'antd'

const UpdateMyPassword = ({ goToOrder, handleSubmit, loading, form }) => {

  const validatorPassword = (passwordPropName, shouldBeEqual = false) => ({
    getFieldValue
  }) => {
    const validator = (_, value) => {
      if (shouldBeEqual) {
        if (!value || getFieldValue(passwordPropName) === value) {
          return Promise.resolve()
        }
        return Promise.reject('Senhas não coincidem!')
      }

      if (value && getFieldValue(passwordPropName) === value) {
        return Promise.reject(
          'A sua nova senha deve ser diferente da sua senha antiga!'
        )
      }
      return Promise.resolve()
    }

    return { validator }
  }

  return (
    <Card bordered={false}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <p>Alterar senha</p>
        </Col>
        <Col span={24}>
          <Form
            form={form}
            layout="vertical"
            name="form_update_password"
            onFinish={handleSubmit}>
            <Form.Item
              name="password"
              label="Senha"
              rules={[{ required: true, message: 'Campo obrigatório!' }]}>
              <Input.Password placeholder="Insira sua senha atual"/>
            </Form.Item>
            <Form.Item
              name="newPassword"
              label="Nova senha"
              rules={[
                validatorPassword('password', false),
                { required: true, message: 'Campo obrigatório!' }
              ]}>
              <Input.Password placeholder="Insira sua nova senha"/>
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              label="Confirme a nova senha"
              rules={[
                validatorPassword('newPassword', true),
                { required: true, message: 'Campo obrigatório!' }
              ]}>
              <Input.Password placeholder="Confirme sua senha"/>
            </Form.Item>

            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
                type="outline"
                danger
                style={{ marginRight: '14px' }}
                onClick={goToOrder}>
                Cancelar
              </Button>
              <Button loading={loading} type="primary" htmlType="submit">
                Salvar alterações
              </Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </Card>
  )
}

export default UpdateMyPassword
