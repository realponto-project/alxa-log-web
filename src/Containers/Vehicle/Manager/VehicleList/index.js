import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image, Space } from 'antd'
import NoData from '../../../../Assets/noData.svg'
import formattedDate from '../../../../utils/parserDate'

const columns = ({ handleClickEdit, goToDetail }) => [
  {
    title: 'Tipo de Veículo',
    dataIndex: 'vehicleType',
    key: 'vehicleType',
    fixed: 'left',
    render: (_, source) => source.vehicleType.name
  },
  {
    title: 'Placa',
    dataIndex: 'plate',
    key: 'plate',
    fixed: 'left'
  },
  {
    title: 'Frota',
    dataIndex: 'fleet',
    key: 'fleet',
    fixed: 'left'
  },
  {
    title: 'Última manutenção',
    dataIndex: 'lastMaintenance',
    key: 'lastMaintenance',
    fixed: 'left',
    render: (lastMaintenance) => formattedDate(lastMaintenance, 'DD MMM YYYY')
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) => (
      <Space>
        <Button type="link" onClick={() => handleClickEdit(source)}>
          Editar
        </Button>

        <Button type="link" onClick={() => goToDetail(source.id)}>
          Detalhes
        </Button>
      </Space>
    )
  }
]

const VehicleList = ({
  datasource,
  handleClickEdit,
  loading,
  handleChangeTableEvent,
  goToDetail,
  offset
}) => {
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
        columns={columns({ handleClickEdit, goToDetail })}
        loading={loading}
        dataSource={datasource.rows}
      />
    </ConfigProvider>
  )
}

export default VehicleList
