import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image, Space } from 'antd'
import NoData from '../../../../Assets/noData.svg'

const columns = ({ handleClickEdit, goToDetail }) => [
  {
    title: 'Operação',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Filial',
    dataIndex: 'companyId',
    key: 'companyId',
    fixed: 'left',
    render: (_, source) => source.company.name
  },
  {
    title: 'Vagas contratadas',
    dataIndex: 'vacancy',
    key: 'vacancy',
    fixed: 'left',
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) => 
      <Space>
      <Button type="link" onClick={() => handleClickEdit(source)}>
        Editar
      </Button>
      <Button type="link" onClick={() => goToDetail(source.id)}>
        Detalhes
      </Button>
    </Space>
  }
]

const OperationList = ({ datasource, handleClickEdit, loading, handleChangeTableEvent, offset, goToDetail }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
        description="Não há dados" 
        image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        pagination={{ pageSize: 20, total: datasource.count, current: offset }}
        onChange={handleChangeTableEvent}
        columns={columns({ handleClickEdit, goToDetail })} 
        loading={loading}
        dataSource={datasource.rows} 
      />
    </ConfigProvider>
  )
}

export default OperationList
