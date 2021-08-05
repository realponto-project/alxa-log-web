import React from 'react'
import { Table, Empty, ConfigProvider, Image } from 'antd'
import NoData from '../../../../Assets/noData.svg'

const columns = () => [
  {
    title: 'Placa do veículo',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: 'Operação',
    dataIndex: 'document',
    key: 'document',
    fixed: 'left',
  },
]

const AuthorizationList = ({ datasource, loading }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
        description="Não há dados" 
        image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        columns={columns()} 
        loading={loading}
        dataSource={datasource} 
      />
      {console.log('aquiiiiiiiiiiii',datasource)}
    </ConfigProvider>
  )
}


export default AuthorizationList
