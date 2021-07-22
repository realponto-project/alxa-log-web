import React from 'react'
import { Row, Col } from 'antd'
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts'

const chartStatus = {
  'solicitation': 'Solicitação',
  'check-in': 'Entrada',
  'avaiable': 'Liberado',
  'parking': 'Estacionar',
  'courtyard': 'Pátio',
  'awaiting_repair': 'Aguardando peça',
  'dock': 'Doca',
  'wash': 'Lavar',
  'supply': 'Abastecer',
  'check-out': 'Saída',
}

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
  const parserChart = data.map(({ status, count }) => ({ name: status, [status]: count }))
  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={parserChart}
            height={380}
            margin={{ left: 15 }}
            maxBarSize={13}>
            <XAxis
              axisLine={false}
              dataKey="name"
              tick={{ fontSize: 13 }}
              tickFormatter={(value) => chartStatus[value]}
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
                    Os totais estão por quantidade em cada status!
                  </tspan>
                </text>
              }
              tick={{ fontSize: 13 }}
            />
            <CartesianGrid stroke="#d7d7d7" vertical={false} />
            <Tooltip
              cursor={{ fillOpacity: 0.3 }}
              labelFormatter={() => ''}
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
    </Row>
  )
}

export default Chart
