import React from 'react'
import { Row, Col, Typography, Tag } from 'antd'
import { cnpj } from 'cpf-cnpj-validator'

const { Title } = Typography

import {
  ComposedChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const chartSettings = [
  { label: 'solicitation', value: 'Solicitação', color: '#5DA0FC' },
  { label: 'check-in', value: 'Entrada', color: '#268E86' },
  { label: 'dock', value: 'Doca', color: '#2D2D2D' },
  { label: 'courtyard', value: 'Pátio', color: '#EA5656' },
  { label: 'wash', value: 'Lavar', color: '#D588F2' },
  { label: 'parking', value: 'Estacionar', color: '#1772C9' },
  { label: 'awaiting_repair', value: 'Aguardando peça', color: '#7550D8' }, 
  { label: 'supply', value: 'Abastecer', color: '#17C9B2' },
  { label: 'avaiable', value: 'Liberado', color: '#F29F03' },
  { label: 'check-out', value: 'Saída', color: '#264ABE' },
]

const VerticalChart = ({ orderOperationStatus }) => {
  const data = orderOperationStatus.map(({ operation, count, status }) =>({ status, count, name: `${operation.name} \n ${operation.company ? cnpj.format(operation.company.document) : '' }` }))
  const parserDataOrders = data.reduce((arr, next) => {
    const findItem = arr.find(item => item.name === next.name)
    if(findItem) {
      arr = arr.map(item => item.name === next.name ? {...item, [next.status]: next.count } : item)
    }
  
    if(!findItem) {
      arr = [...arr, { name: next.name, [next.status]: next.count }]
    }
  
   return arr
  }, [])
  return (
    <Row>
      <Col span={24}>
        <Title level={5}>Total por operação</Title>
      </Col>
      <Col span={24}>
        <ResponsiveContainer width="100%" height={800}>
          <ComposedChart
            layout="vertical"
            height="100%"
            data={parserDataOrders.sort((a, b) => a.value - b.value)}
            margin={{
              top: 50,
              right: 20,
              bottom: 20,
              left: 100
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" scale="band" />
            <Tooltip />
            {chartSettings.map(({ label, color, value }) => (
              <Bar
                dataKey={label}
                fill={color}
                key={label}
                name={value}
                stroke={color}
                type="monotone"
                barSize={20}
                stackId="a"
              />
            ))}
          </ComposedChart>
        </ResponsiveContainer>              
      </Col>
      <Col span={24}>
        <Row style={{ marginTop: '20px' }} gutter={[8, 8]} wrap={true}>
            <Col span={24}>
              <Title level={5}>LEGENDAS</Title>
            </Col>
            {chartSettings.map(({ color, value, label }) => (
              <Col key={`${color}-${value}`} xs={6} sm={6} md={4} lg={4} xl={4}>
                <Tag color={color}>{value}</Tag>
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  )
}

export default VerticalChart
