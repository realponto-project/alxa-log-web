import React from 'react'
import { Table, Button, Space } from 'antd'
import { cnpj } from 'cpf-cnpj-validator'

const columns = ({ handleClickEdit, goToDetail }) => [
  {
    title: 'Razão social',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Cnpj',
    dataIndex: 'document',
    key: 'document',
    fixed: 'left',
    render: (document) => cnpj.format(document)
  },
  {
    title: 'Endereço',
    dataIndex: 'address',
    key: 'address',
    fixed: 'left',
    render: (_, source) => `${source.city}/${source.state} `
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

const BranchList = ({
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
      dataSource={datasource.rows}
    />
  )
}

export default BranchList
