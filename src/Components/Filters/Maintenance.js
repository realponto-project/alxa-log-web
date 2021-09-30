import React, { useState } from 'react'
import {
  Button,
  Checkbox,
  DatePicker,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography
} from 'antd'
import { SearchOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'

const { RangePicker } = DatePicker
const { Title } = Typography

const statusFilters = [
  { value: 'cancel', label: 'Cancelado' },
  { value: 'solicitation', label: 'Solicitação' },
  { value: 'check-in', label: 'Entrada' },
  { value: 'avaiable', label: 'Aguardando Retirada' },
  { value: 'parking', label: 'Estacionar' },
  { value: 'courtyard', label: 'Pátio' },
  { value: 'awaiting_repair', label: 'Aguardando peça' },
  { value: 'dock', label: 'Doca' },
  { value: 'wash', label: 'Lavar' },
  { value: 'supply', label: 'Abastecer' },
  { value: 'check-out', label: 'Saída' },
  { value: 'external_service', label: 'Serviços externos' }
]

const priorityFilters = [
  { value: 'low', label: 'Baixo' },
  { value: 'high', label: 'Alto' },
  { value: 'medium', label: 'Média' }
]

const services = [
  { value: 'corrective', label: 'Corretiva' },
  { value: 'preventive', label: 'Preventiva' }
]

const FilterMaintenence = ({
  clearFilter,
  handleFilter,
  form,
  visibleSearchPlate = true
}) => {
  const [moreFilters, setMoreFilters] = useState(false)

  return (
    <Form
      form={form}
      onFinish={(values) =>
        handleFilter(JSON.parse(JSON.stringify(values, null, 2)))
      }>
      <Row gutter={[8, 0]} justify="space-between">
        <Col span={6}>
          <Form.Item name="dates">
            <RangePicker allowClear format="DD/MM/YYYY" placeholder="" />
          </Form.Item>
        </Col>
        <Col span={10}>
          {visibleSearchPlate && (
            <Form.Item name="plate">
              <Input
                placeholder="Filtre pela placa da manutenção."
                prefix={<SearchOutlined />}
                // readOnly
              />
            </Form.Item>
          )}
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <Form.Item>
            <Space>
              <Button onClick={() => setMoreFilters(!moreFilters)}>
                Mais filtros
                {moreFilters ? <UpOutlined /> : <DownOutlined />}
              </Button>
              <Button onClick={clearFilter}>Limpar filtros</Button>
              <Button type="primary" htmlType="primary">
                Filtrar
              </Button>
            </Space>
          </Form.Item>
        </Col>
        {moreFilters && (
          <Col span={24}>
            <div
              style={{
                backgroundColor: '#f4f4f4',
                padding: '14px'
              }}>
              <Row>
                <Col span={10}>
                  <Title level={5}>Status</Title>
                  <Form.Item name="status">
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row gutter={[8, 8]}>
                        {statusFilters.map(({ value, label }) => (
                          <Col span={12} key={value}>
                            <Checkbox value={value}>{label}</Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Title level={5}>Prioridade</Title>
                  <Form.Item name="priorities">
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row gutter={[8, 8]}>
                        {priorityFilters.map(({ value, label }) => (
                          <Col span={24} key={value}>
                            <Checkbox value={value}>{label}</Checkbox>
                          </Col>
                        ))}
                      </Row>
                    </Checkbox.Group>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Title level={5}>Serviço</Title>
                  <Form.Item name="services">
                    <Checkbox.Group style={{ width: '100%' }}>
                      <Row gutter={[8, 8]}>
                        {services.map(({ value, label }) => (
                          <Col span={24} key={value}>
                            <Checkbox value={value}>{label}</Checkbox>
                          </Col>
                        ))}
                      </Row>
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

export default FilterMaintenence
