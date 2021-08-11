import React from 'react'
import { Row, Col, Button, Form, Input, Select, Checkbox, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { map } from 'ramda'

const { Option } = Select

const FilterAuthorization = ({ handleSubmit, clearFilter, operations }) => {
  const [form] = Form.useForm()
  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={{ activated: [false, true] }}>
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item name="plate">
            <Input
              placeholder="Filtre pela placa da manutenção."
              prefix={<SearchOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="operationId">
            <Select allowClear placeholder="Selecione a operação">
              {map(
                ({ id, name }) => (
                  <Option key={id} value={id}>
                    {name}
                  </Option>
                ),
                operations
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item name="activated">
            <Checkbox.Group>
              <Row>
                <Checkbox value={true}>Ativo</Checkbox>
              </Row>
              <Row>
                <Checkbox value={false}>Inativo</Checkbox>
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Col>
        <Col span={5} style={{ textAlign: 'right' }}>
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
