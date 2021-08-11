import React from 'react'
import { Table, Switch } from 'antd'

const columns = ({ handleSubmitUpdateAuthorization }) => [
  {
    title: 'Placa do veículo',
    dataIndex: 'plate',
    key: 'plate',
    fixed: 'left',
    render: (_, source) => source.vehicle.plate
  },
  {
    title: 'Operação',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
    render: (_, source) => source.operation.name
  },
  {
    title: 'Status',
    dataIndex: 'activated',
    key: 'id',
    fixed: 'left',
    render: (activated, source) => {
      return (
        <Switch
          checked={activated}
          checkedChildren="Ativo"
          unCheckedChildren="Inativo"
          onChange={(activated) =>
            handleSubmitUpdateAuthorization({ ...source, activated })
          }
        />
      )
    }
  }
]

const AuthorizationList = ({
  datasource,
  loading,
  handleSubmitUpdateAuthorization,
  handleChange,
  pagination
}) => {
  return (
    <Table
      pagination={pagination}
      columns={columns({ handleSubmitUpdateAuthorization })}
      onChange={handleChange}
      loading={loading}
      dataSource={datasource}
    />
  )
}
export default AuthorizationList
