import React from 'react'
import { Table, Button, Space, Tooltip } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import { map } from 'ramda'

const columns = ({ handleClickEdit, goToDetail }) => [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Cnh',
    dataIndex: 'driverLicense',
    key: 'driverLicense',
    fixed: 'left'
  },
  {
    title: 'RG',
    dataIndex: 'rg',
    key: 'rg',
    fixed: 'left'
  },
  {
    title: 'CPF',
    dataIndex: 'cpf',
    key: 'cpf',
    fixed: 'left'
  },
  {
    title: 'Telefone',
    dataIndex: 'phone',
    key: 'phone',
    fixed: 'left'
  },
  {
    title: 'Vínculo',
    dataIndex: 'bond',
    key: 'bond',
    fixed: 'left'
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
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) => (
      <Tooltip placement="bottom" title={()=> {
        <div>
          teste
        </div>
      }}>
        <InfoCircleOutlined />
      </Tooltip>
    )
  }
]

const DriverList = ({
  datasource,
  handleClickEdit,
  loading,
  handleChangeTableEvent,
  offset,
  goToDetail
}) => {
  return (
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
      dataSource={map((row) => ({ ...row, key: row.id }), datasource.rows)}
    />
  )
}

export default DriverList
