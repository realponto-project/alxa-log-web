import React, { useState } from 'react'
import { Row, Col, Card, Typography, Radio, Table, Button } from 'antd'
import { BarChartOutlined, DatabaseOutlined } from '@ant-design/icons'
import { cnpj } from 'cpf-cnpj-validator'

import {
  parseStatus,
  parseStatusColor,
  services,
  status
} from '../../../utils/maintenanceOrder'
import formattedDate from '../../../utils/parserDate'
import diffTime from '../../../utils/permananceTime'
import Tag from '../../../Components/Tag'
import BarChart from './BarChart'

import OrdersSvg from '../../../Assets/orders.svg'
import CustomersSvg from '../../../Assets/customers.svg'
import CheckoutSvg from '../../../Assets/checkout.svg'
import AvailableSVG from '../../../Assets/available.svg'

import FilterMaintenence from '../../../Components/Filters/Maintenance'
import CircleBar from '../../../Components/circleBar'

const { Text, Title } = Typography

const columns = (gotoDetailOrder) => [
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
    fixed: 'left'
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
    render: (value) => (
      <Tag color={parseStatusColor[value]}>{parseStatus[value]}</Tag>
    )
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
    render: (value) => services[value]
  },
  {
    title: 'Permanência',
    dataIndex: 'service',
    key: 'service',
    fixed: 'left',
    render: (_, source) => {
      const checkIn = source.maintenanceOrderEvents.find(
        (item) => item.status === 'check-in'
      )
      if (checkIn) {
        return diffTime(checkIn.createdAt, source.updatedAt, source.status)
      }
      return '-'
    }
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (id) => (
      <Button type="link" onClick={() => gotoDetailOrder(id)}>
        Detalhes
      </Button>
    )
  }
]

const CardStatus = ({ title, count, srcImage, total }) => (
  <Card
    style={{
      borderRadius: 5,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
    }}>
    <Row align="middle" justify="space-between">
      <Col span={12}>
        <Text style={{ fontSize: '1rem' }}>{title}</Text>
        <Title level={1} style={{ margin: 0, padding: 0 }}>
          {count > 0 ? count : '-'}
        </Title>
      </Col>
      <Col span={12}>
        <CircleBar icon={srcImage} total={total} count={count} />
      </Col>
    </Row>
  </Card>
)

const Detail = ({
  operation,
  chartData,
  handleChangeTableEvent,
  offset,
  datasource,
  gotoDetailOrder,
  filterForm,
  handleFilter,
  clearFilter,
  loading
}) => {
  const [mode, setMode] = useState('table')

  const handleChange = ({ target }) => setMode(target.value)
  const total = chartData.reduce((acc, prev) => acc + Number(prev.count), 0)

  const vehicleTotal = chartData
    .filter(
      ({ status }) =>
        status !== 'check-out' &&
        status !== 'solicitation' &&
        status !== 'cancel'
    )
    .reduce((acc, prev) => acc + Number(prev.count), 0)

  const vehicleTotalFinished = chartData.find(
    ({ status }) => status === 'check-out'
  )

  const vehicleTotalSolicitacion = chartData.find(
    ({ status }) => status === 'solicitation'
  )

  const vehicleTotalAvailable = chartData.find(
    ({ status }) => status === 'avaiable'
  )

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Title level={4}>Detalhes</Title>
            </Col>
            <Col span={8}>
              <Text>Operação</Text>
              <br />
              <Text>
                <strong>{operation.name || '-'}</strong> <br />
              </Text>
            </Col>
            <Col span={8}>
              <Text>Filial</Text>
              <br />
              <Text>
                <strong>
                  {(operation.company && operation.company.name) || '-'}
                </strong>{' '}
                <br />
                <small>
                  {operation.company && cnpj.format(operation.company.document)}
                </small>
              </Text>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={6}>
        <CardStatus
          title="Total de solicitações"
          count={vehicleTotalSolicitacion?.count ?? '-'}
          srcImage={CustomersSvg}
          total={total}
        />
      </Col>

      <Col span={6}>
        <CardStatus
          title="Total de veículos"
          count={vehicleTotal || '-'}
          srcImage={OrdersSvg}
          total={total}
        />
      </Col>

      <Col span={6}>
        <CardStatus
          title="Total de liberado"
          count={vehicleTotalAvailable?.count ?? '-'}
          srcImage={AvailableSVG}
          total={total}
        />
      </Col>

      <Col span={6}>
        <CardStatus
          title="Total de concluídos"
          count={vehicleTotalFinished?.count ?? '-'}
          srcImage={CheckoutSvg}
          total={total}
        />
      </Col>

      {mode === 'table' && (
        <Col span={24}>
          <Card bordered={false}>
            <Col span={24}>
              <FilterMaintenence
                form={filterForm}
                handleFilter={handleFilter}
                clearFilter={clearFilter}
              />
            </Col>
          </Card>
        </Col>
      )}

      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={24} style={{ textAlign: 'right', marginBottom: '20px' }}>
              <Radio.Group onChange={handleChange} value={mode}>
                <Radio.Button value="table">
                  <DatabaseOutlined />
                </Radio.Button>
                <Radio.Button value="chart">
                  <BarChartOutlined />
                </Radio.Button>
              </Radio.Group>
            </Col>

            <Col span={24}>
              {mode === 'table' ? (
                <Table
                  loading={loading}
                  pagination={{
                    showSizeChanger: false,
                    pageSize: 20,
                    total: datasource.count,
                    current: offset
                  }}
                  columns={columns(gotoDetailOrder)}
                  dataSource={datasource.rows}
                  onChange={handleChangeTableEvent}
                />
              ) : (
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
