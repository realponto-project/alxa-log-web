import React, { useState } from 'react'
import { Row, Col, Button, DatePicker, Form, Input, Select, Space, Typography, Checkbox } from 'antd'
import { SearchOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { map } from 'ramda'

const { Title } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

const incidentTypes = [
  { value: 'accident', label: 'Acidente' },
  { value: 'collision', label: 'Colisão' },
  { value: 'vehicle_break_down', label: 'Veículo quebrado' }
]

const FilterIncident = ({ handleSubmit, clearFilter, operations }) => {
  const [form] = Form.useForm()
  const [moreFilters, setMoreFilters] = useState(false)
  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      initialValues={{ activated: [false, true] }}>
      <Row gutter={8}>
        <Col span={5}>
          <Form.Item name="dates">
            <RangePicker allowClear format="DD/MM/YYYY" placeholder="" />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item name="plate">
            <Input
              placeholder="Filtre pela placa"
              prefix={<SearchOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Row>
            <Form.Item>
              <Space>
                <Button onClick={() => setMoreFilters(!moreFilters)}>
                  Mais filtros
                {moreFilters ? <UpOutlined /> : <DownOutlined />}
                </Button>
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
        {moreFilters && (
          <Col span={24}>
            <div
              style={{
                backgroundColor: '#f4f4f4',
                padding: '14px',
                marginBottom: '20px'
              }}>
              <Row>
                <Col span={8}>
                  <Title level={5}>Incidentes</Title>
                    <Form.Item name="incidentType">
                      <Checkbox.Group>
                      {map(
                          ({ value, label }) => (
                            <Row>
                              <Checkbox key={value} value={value}>
                                {label}
                              </Checkbox>
                            </Row>
                          ),
                          incidentTypes
                        )}
                      </Checkbox.Group>
                    </Form.Item>
                </Col>
              </Row>
            </div>
          </Col>
        )}
      </Row>
    </Form>
  )
}

export default FilterIncident
