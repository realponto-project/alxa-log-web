import React from 'react'
import { Row, Col, Button, DatePicker, Form, Input, Select, Space } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { map } from 'ramda'

const { Option } = Select
const { RangePicker } = DatePicker

const incidentTypes = [
  { value: 'accident', label: 'Acidente' },
  { value: 'collision', label: 'Colisão' },
  { value: 'vehicle_break_down', label: 'Veículo quebrado' }
]

const FilterIncident = ({ handleSubmit, clearFilter, operations }) => {
  const [form] = Form.useForm()
  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={{ activated: [false, true] }}>
      <Row gutter={8}>
        <Col span={16}>
          <Form.Item name="plate">
            <Input
              placeholder="Filtre pela placa do incidente."
              prefix={<SearchOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="dates">
            <RangePicker allowClear format="DD/MM/YYYY" placeholder="" />
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
        <Col span={8}>
          <Form.Item name="incidentType">
            <Select allowClear placeholder="Selecione a tipo de incidente">
              {map(
                ({ value, label }) => (
                  <Option key={value} value={value}>
                    {label}
                  </Option>
                ),
                incidentTypes
              )}
            </Select>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Row justify="end">
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
          </Row>
        </Col>
      </Row>
    </Form>
  )
}

export default FilterIncident
