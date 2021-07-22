import React from 'react'
import { Row, Col, Typography, Tag } from 'antd'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

import formattedDate from '../../../utils/parserDate'

const { Title } = Typography

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

const Chart = ({ data }) => {
  const dataParse = data
    .map((item) => ({...item, name: `${item.name.substr(8, 2)}/${item.name.substr(5, 2)}/${item.name.substr(0, 4)}`, order: item.name.substr(8, 2)}))
    .sort((a, b) => a.order - b.order)
  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Title level={5}>Total por status</Title>
      </Col>
      <Col span={24}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={dataParse}
            height={380}
            margin={{ left: 15 }}
            maxBarSize={13}>
            <XAxis
              axisLine={false}
              dataKey="name"
              tick={{ fontSize: 13 }}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              height={50}
              label={
                <text
                  fontSize="13"
                  textAnchor="end"
                  transform="rotate(270, 13, 143)"
                  x="120"
                  y="140">
                  <tspan>
                    Os totais estão por quantidade de veículos em cada status!
                  </tspan>
                </text>
              }
              tick={{ fontSize: 13 }}
            />
            <CartesianGrid stroke="#d7d7d7" vertical={false} />
            <Tooltip
              cursor={{ fillOpacity: 0.3 }}
              labelFormatter={(value) => formattedDate(value, 'DD/MM/YYYY', 1)}
            />
            {chartSettings.map(({ label, color, value }) => (
              <Bar
                dataKey={label}
                fill={color}
                key={label}
                name={value}
                stackId="a"
                stroke={color}
                type="monotone"
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </Col>
      <Col span={24}>
        <Row style={{ marginTop: '20px' }} gutter={[8, 8]} wrap={true}>
            <Col span={24}>
              <Title level={5}>LEGENDAS</Title>
            </Col>
            {chartSettings.sort((a, b) => a.value - b.value).map(({ color, value, label }) => (
              <Col key={`${color}-${value}`} xs={6} sm={6} md={4} lg={4} xl={4}>
                <Tag color={color}>{value}</Tag>
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Chart
