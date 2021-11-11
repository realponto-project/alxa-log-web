import React from 'react'
import { Table, Button } from 'antd'
import NoData from '../../../../Assets/noData.svg'

const columns = ({ handleClickEdit }) => [
  {
    title: 'Tipo de veículo',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) =>  <Button type="link" onClick={() => handleClickEdit(source)}>
      Editar
    </Button>
  }
]

const FleetList = ({ datasource, handleClickEdit, loading, handleChangeTableEvent, offset }) => {
  return (
      <Table 
        pagination={{ showSizeChanger: false, pageSize: 20, total: datasource.count, current: offset }}
        onChange={handleChangeTableEvent}
        columns={columns({ handleClickEdit })} 
        loading={loading}
        dataSource={datasource.rows}
      />
  )
}

export default FleetList
