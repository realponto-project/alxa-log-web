import React from 'react'
import {
  Table,
  Button,
  Empty,
  ConfigProvider,
  Image,
  Space,
  Tag,
  Menu,
  Dropdown,
  Modal
} from 'antd'
import NoData from '../../../../Assets/noData.svg'
import formattedDate from '../../../../utils/parserDate'
import diffTime from '../../../../utils/permananceTime'
import { ExclamationCircleOutlined } from '@ant-design/icons'

import {
  parseStatus,
  parseStatusColor,
  services,
  status
} from '../../../../utils/maintenanceOrder'

const { confirm } = Modal

const menu = (handleMenuClick) => (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Cancelar Solicitação</Menu.Item>
  </Menu>
)

const columns = ({
  handleClickEdit,
  handleShowVoucher,
  gotoDetail,
  handleMenuClick
}) => [
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
    title: 'Frota',
    dataIndex: 'fleet',
    key: 'fleet',
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
    render: (id, source) => (
      <Space>
        {source.status === 'solicitation' && (
          <Button type="link" onClick={() => handleClickEdit(source)}>
            Editar
          </Button>
        )}

        {source.status !== 'solicitation' && (
          <Button type="link" onClick={() => gotoDetail(id)}>
            Detalhes
          </Button>
        )}

        {source.status !== 'check-out' && source.status !== 'cancel' && (
          <Button type="link" onClick={() => handleShowVoucher(source)}>
            Voucher
          </Button>
        )}

        {source.status === 'solicitation' && (
          <Dropdown.Button type="link" overlay={menu(handleMenuClick(id))} />
        )}
      </Space>
    )
  }
]

const MaintenanceList = ({
  gotoDetail,
  datasource,
  handleClickEdit,
  loading,
  handleChangeTableEvent,
  handleShowVoucher,
  offset,
  handleCancelOrder
}) => {
  const handleMenuClick = (id) => () => {
    confirm({
      title: 'Deseja cancelar a solicitação?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Cancelar',
      okType: 'danger',
      cancelText: 'Confirmar',
      onOk: () => {
        console.log('cancelar', id)
      },
      onCancel: () => {
        handleCancelOrder({ id, status: 'cancel' })
      }
    })
  }

  return (
    <ConfigProvider
      renderEmpty={() => (
        <Empty
          description="Não há dados"
          image={<Image width={85} src={NoData} preview={false} />}
        />
      )}>
      <Table
        pagination={{
          showSizeChanger: false,
          pageSize: 20,
          total: datasource.count,
          current: offset
        }}
        onChange={handleChangeTableEvent}
        columns={columns({
          handleClickEdit,
          handleShowVoucher,
          gotoDetail,
          handleMenuClick
        })}
        loading={loading}
        dataSource={datasource.rows}
        size="small"
      />
    </ConfigProvider>
  )
}

export default MaintenanceList
