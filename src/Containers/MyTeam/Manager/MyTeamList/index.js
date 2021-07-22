import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image } from 'antd'
import NoData from '../../../../Assets/noData.svg'

const columns = ({ handleClickEdit }) => [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'CPF',
    dataIndex: 'document',
    key: 'document',
    fixed: 'left',
    render: (document) => `${document.substr(0, 3)}.***.${document.substr(6, 3)}-**`
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) =>  <Button type="link" onClick={() => handleClickEdit(source)}>
      Editar
    </Button>
  }
]

const MyTeamList = ({ datasource, handleClickEdit, loading, handleChangeTableEvent, offset }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
        description="Não há dados" 
        image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ pageSize: 20, total: datasource.count, current: offset }}
        onChange={handleChangeTableEvent}
        columns={columns({ handleClickEdit })} 
        loading={loading}
        dataSource={datasource.rows} 
      />
    </ConfigProvider>
  )
}

export default MyTeamList
