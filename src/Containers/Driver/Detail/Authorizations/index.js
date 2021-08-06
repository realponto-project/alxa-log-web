import React from 'react'
import { Table, Empty, ConfigProvider, Image, Switch } from 'antd'
import NoData from '../../../../Assets/noData.svg'

const columns = ({handleSubmitUpdateAuthorization}) => [
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
    key: 'activated',
    fixed: 'left',
    render: (_, source) => 
      <Switch 
        onChange={(activated) => handleSubmitUpdateAuthorization({...source, activated })} 
        value={source.activated}
      />
    },
]

const AuthorizationList = ({ datasource, loading, handleSubmitUpdateAuthorization }) => {
  return (
    <ConfigProvider renderEmpty={() => <Empty 
        description="Não há dados" 
        image={<Image width={85} src={NoData} preview={false} />}
      />
    }>
      <Table 
        columns={columns({handleSubmitUpdateAuthorization})} 
        loading={loading}
        dataSource={datasource} 
      />
    </ConfigProvider>
  )
}


export default AuthorizationList
