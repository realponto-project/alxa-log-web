import React, { useState } from 'react'
import {
  Row,
  Col,
  Button,
  DatePicker,
  Form,
  Input,
  Space,
  Typography,
  Checkbox
} from 'antd'
import { SearchOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import { map } from 'ramda'

import { incidentTypes } from '../../constants/Driver'
import styles from './style.module.css'

const { Title } = Typography
const { RangePicker } = DatePicker

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
                marginBottom: '20px'
              }}
              className={styles.wrapperMoreFilters}>
              <Row>
                <Col span={24}>
                  <Title level={5}>Incidentes</Title>
                </Col>
                <Form.Item name="incidentType">
                  <Checkbox.Group>
                    <Row>
                      {map(
                        ({ value, label }) => (
                          <Col span={12}>
                            <Checkbox key={value} value={value}>
                              {label}
                            </Checkbox>
                          </Col>
                        ),
                        incidentTypes
                      )}
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </Row>
            </div>
          </Col>
        )}
      </Row>
    </Form>
  )
}

export default FilterIncident
