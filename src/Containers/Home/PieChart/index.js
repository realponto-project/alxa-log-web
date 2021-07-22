import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Row, Col, Typography } from 'antd'
import styles from './style.module.css'
import formattedDate from '../../../utils/parserDate'

const parseStatusColor = {
  'solicitation': '#5DA0FC',
  'check-in': '#268E86',
  'avaiable': '#F29F03',
  'parking': '#1772C9',
  'courtyard': '#EA5656',
  'awaiting_repair': '#7550D8',
  'dock': '#2D2D2D',
  'wash': '#D588F2',
  'supply': '#17C9B2',
  'check-out': '#264ABE',
}

const parseStatus = {
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

const { Title } = Typography
const PieChartHome = ({
  data
}) => {
  const dataChart = data.map(({ status, count }) => ({ name: parseStatus[status], value: Number(count)}))

  return (
    <Row gutter={[0, 16]}>
      <Col span={24}>
        <Title className={styles.pieChartTitle}>Totais por operação</Title>
      </Col>
      <Col span={24}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={800} height={200}>
            <Pie
              data={dataChart}
              innerRadius={100}
              outerRadius={125}
              fill="#E6E6E6"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map(({ status }, index) => (
                <Cell key={`cell-${index}`} fill={parseStatusColor[status]} />
              ))}
            </Pie>
            <Tooltip
              cursor={{ fillOpacity: 0.3 }}
              labelFormatter={(value) => formattedDate(value, 'DD/MM/YYYY')}
            />
          </PieChart>
        </ResponsiveContainer>
      </Col>
      {/* <Col span={24}>
        <div className={styles.pieChartLegends}>
          <span className={styles.spanCircle} />
          <p className={styles.pieChartLegend}>Vendas</p>
        </div>
      </Col> */}
    </Row>
  )
}

export default PieChartHome
