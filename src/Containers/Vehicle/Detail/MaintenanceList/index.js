import React from 'react'
import { Table, Button, Tag } from 'antd'
import formattedDate from '../../../../utils/parserDate'
import diffTime from '../../../../utils/permananceTime'

import {
  parseStatus,
  parseStatusColor,
  services,
  status
} from '../../../../utils/maintenanceOrder'

const columns = ({ gotoDetail }) => [
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
    render: (_, source) =>
      diffTime(source.createdAt, source.updatedAt, source.status)
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (id) => (
      <Button type="link" onClick={() => gotoDetail(id)}>
        Detalhes
      </Button>
    )
  }
]

const MaintenanceList = ({
  datasource,
  handleChangeTableEvent,
  gotoDetail,
  loading,
  offset
}) => {
  return (
    <Table
      pagination={{
        showSizeChanger: false,
        pageSize: 10,
        total: datasource.count,
        current: offset
      }}
      onChange={handleChangeTableEvent}
      columns={columns({
        gotoDetail
      })}
      loading={loading}
      dataSource={datasource.rows}
      size="small"
    />
  )
}

export default MaintenanceList
