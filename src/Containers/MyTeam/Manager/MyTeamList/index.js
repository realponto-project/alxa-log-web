import React from 'react'
import { Table, Button } from 'antd'

const columns = ({ handleClickEdit, user }) => [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'CPF',
    dataIndex: 'document',
    key: 'document',
    fixed: 'left',
    render: (document) =>
      `${document.substr(0, 3)}.***.${document.substr(6, 3)}-**`
  },
  {
    title: 'Empresa',
    key: 'companyName',
    render: (_, source) => source.company.name
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) => {
      // if (source.companyId !== user.companyId) return null
      return (
        <Button type="link" onClick={() => handleClickEdit(source)}>
          Editar
        </Button>
      )
    }
  }
]

const MyTeamList = ({
  user,
  datasource,
  handleClickEdit,
  loading,
  handleChangeTableEvent,
  offset
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
        columns={columns({ handleClickEdit, user })}
        loading={loading}
        dataSource={datasource.rows}
      />
  )
}

export default MyTeamList
