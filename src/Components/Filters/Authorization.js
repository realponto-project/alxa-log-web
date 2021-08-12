import React from 'react'
import { Row, Col, Button, Form, Input, Checkbox, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

const FilterAuthorization = ({ handleSubmit, clearFilter }) => {
  const [form] = Form.useForm()
  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={{ activated: [false, true] }}>
      <Row gutter={8}>
        <Col span={12}>
          <Form.Item name="plate">
            <Input
              placeholder="Filtre pela placa"
              prefix={<SearchOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="activated">
            <Checkbox.Group>
              <Checkbox value={true}>Ativo</Checkbox>
              <Checkbox value={false}>Inativo</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Space>
              <Button
                onClick={() => {
                  form.resetFields()
                  clearFilter()
                }}>
                Limpar filtros
              </Button>
              <Button type="primary" htmlType="primary">
                Filtrar
              </Button>
            </Space>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default FilterAuthorization
