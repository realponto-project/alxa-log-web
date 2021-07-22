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
  collision: 'Colisão', 
  accident: 'Acidente', 
  vehicle_break_down: 'Veículo quebrado'
}

const chartSettings = [
  { label: 'accident', value: 'Acidente', color: '#268E86' },
  { label: 'collision', value: 'Colisão', color: '#5DA0FC' },
  { label: 'vehicle_break_down', value: 'Veículo quebrado', color: '#2D2D2D' },
]

const Chart = ({ data }) => {
  const parserChart = data.map(({ incidentType, count }) => ({ name: incidentType, [incidentType]: count }))
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
                    Os totais estão por quantidade de incidentes em cada status!
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
