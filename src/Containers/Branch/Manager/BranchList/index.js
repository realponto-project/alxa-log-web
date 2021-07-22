import React from 'react'
import { Table, Button, Empty, ConfigProvider, Image, Space } from 'antd'
import NoData from '../../../../Assets/noData.svg'
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

const BranchList = ({ datasource, handleClickEdit, loading, handleChangeTableEvent, offset, goToDetail }) => {
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

export default BranchList
