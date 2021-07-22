import React, { useState } from 'react'
import { Row, Col, Card, Typography, Tag, Radio, Table, Button, Image } from 'antd'
import BarChart from './BarChart'
import { cnpj } from 'cpf-cnpj-validator'
import { BarChartOutlined, DatabaseOutlined } from '@ant-design/icons'
import {
  parseStatus,
  parseStatusColor,
  services,
  status
} from '../../../utils/maintenanceOrder'
import formattedDate from '../../../utils/parserDate'
import diffTime from '../../../utils/permananceTime'

import OrdersSvg from './orders.svg'
import CustomersSvg from './customers.svg'
import EmptyStateOrderSvg from './empty-state-order.svg'
import EmptyStateCustomersSvg from './empty-state-customers.svg'
import CheckoutSvg from './checkout.svg'
import CheckoutEmptySvg from './checkout-empty.svg'
import AvailableSVG from './available.svg'
import AvailableEmptySVG from './available-empty.svg'

import styles from './style.module.css'

const { Text, Title } = Typography 

const columns = gotoDetailOrder => [
  {
    title: 'Data da manutenção',
    dataIndex: 'maintenanceDate',
    key: 'maintenanceDate',
    fixed: 'left',
    render: (maintenanceDate) => formattedDate(maintenanceDate, 'DD MMM YYYY')
  },
  {
    title: 'Placa Manutenção',
    dataIndex: 'plateCart',
    key: 'plateCart',
    fixed: 'left',
  },
  {
    title: 'Motorista',
    dataIndex: 'maintenanceOrderDrivers',
    key: 'maintenanceOrderDrivers',
    fixed: 'left',
    render: (_, source) => source.maintenanceOrderDrivers[0].driver.name

  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    fixed: 'left',
    render: value => <Tag color={parseStatusColor[value]}>{parseStatus[value]}</Tag>
  },
  {
    title: 'Prioridade',
    dataIndex: 'priority',
    key: 'priority',
    fixed: 'left',
    render: (value) => status[value]
  },
  {
    title: 'Tipo de Serviço',
    dataIndex: 'service',
    key: 'service',
    fixed: 'left',
    render: value => services[value]
  },
  {
    title: 'Permanência',
    dataIndex: 'service',
    key: 'service',
    fixed: 'left',
    render: (_, source) => diffTime(source.createdAt, source.updatedAt, source.status)
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (id) => 
      <Button type="link" onClick={() => gotoDetailOrder(id)}>
        Detalhes
      </Button>
  }
]

const Detail = ({
  company,
  chartData,
  handleChangeTableEvent,
  offset,
  datasource,
  gotoDetailOrder,
}) => {
  const [mode, setMode] = useState('table')

  const handleChange = ({ target }) => setMode(target.value)
  const vehicleTotal = chartData
    .filter(({ status }) => status !== 'check-out' && status !== 'solicitation' && status !== 'cancel')
    .reduce((acc, prev) => acc + Number(prev.count), 0)

  const vehicleTotalFinished = chartData
    .find(({ status }) => status === 'check-out')
  
  const vehicleTotalSolicitacion = chartData
    .find(({ status }) => status === 'solicitation')

  const vehicleTotalAvailable = chartData
    .find(({ status }) => status === 'avaiable')

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Title level={4}>Detalhes</Title>
            </Col>
            <Col span={8}>
              <Text>Filial</Text><br />
              <Text>
                <strong>{company.name || '-' }</strong> <br />
                <small>{cnpj.format(company.document)}</small>
              </Text>
            </Col>
            <Col span={8}>
              <Text>Endereço</Text><br />
              <Text>
                {company.street ? <strong>{company.street}, {company.streetNumber} - {company.neighborhood} - {company.city} - {company.state}, {company.zipcode}</strong> : '-'} <br />
              </Text>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de solicitações</h1>
            <h1 className={styles.cardTotalValue}>{vehicleTotalSolicitacion && vehicleTotalSolicitacion.count > 0 ? vehicleTotalSolicitacion.count :  '-' }</h1>
          </div>
          <Image preview={false} src={vehicleTotalSolicitacion && vehicleTotalSolicitacion.count > 0 ? CustomersSvg : EmptyStateCustomersSvg} alt="orders" />
        </div>
      </Col>

      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de veículos</h1>
            <h1 className={styles.cardTotalValue}>{vehicleTotal > 0 ? vehicleTotal :  '-' }</h1>
          </div>
          <Image preview={false} src={vehicleTotal > 0 ? OrdersSvg : EmptyStateOrderSvg} alt="orders" />
        </div>
      </Col>

      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de liberado</h1>
            <h1 className={styles.cardTotalValue}>{vehicleTotalAvailable && vehicleTotalAvailable.count > 0 ? vehicleTotalAvailable.count :  '-' }</h1>
          </div>
          <Image preview={false} src={vehicleTotalAvailable && vehicleTotalAvailable.count > 0 ? AvailableSVG : AvailableEmptySVG} alt="orders" />
        </div>
      </Col>

      <Col span={6}>
        <div className={styles.cardTotalValues}>
          <div>
            <h1 className={styles.cardTotalTitle}>Total de concluídos</h1>
            <h1 className={styles.cardTotalValue}>{vehicleTotalFinished && vehicleTotalFinished.count > 0 ? vehicleTotalFinished.count :  '-' }</h1>
          </div>
          <Image preview={false} src={vehicleTotalFinished && vehicleTotalFinished.count > 0 ? CheckoutSvg : CheckoutEmptySvg} alt="orders" />
        </div>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={24} style={{ textAlign: 'right', marginBottom: '20px' }}>
              <Radio.Group onChange={handleChange} value={mode}>
                <Radio.Button value="table"><DatabaseOutlined /></Radio.Button>
                <Radio.Button value="chart"><BarChartOutlined /></Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={24}>
             { mode === 'table' 
               ? (
                <Table 
                  pagination={{ pageSize: 20, total: datasource.count, current: offset }}
                  columns={columns(gotoDetailOrder)} 
                  dataSource={datasource.rows} 
                  handleChangeTableEvent={handleChangeTableEvent}
                />
               )
              :(
                <BarChart data={chartData} />
              )}
            </Col>
          </Row>
        </Card>
      </Col>

    </Row>
  )
}

export default Detail
