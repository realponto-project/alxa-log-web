import React from 'react'
import { Table, Tag } from 'antd'
import { cnpj } from 'cpf-cnpj-validator'

import formattedDate from '../../../../utils/parserDate'

const chartSettings = {
  collision: 'Colisão',
  accident: 'Acidente',
  vehicle_break_down: 'Veículo quebrado'
}

const colors = {
  collision: '#5DA0FC',
  accident: '#268E86',
  vehicle_break_down: '#2D2D2D'
}

const columns = [
  {
    title: 'Data do incidente',
    dataIndex: 'incidentDate',
    key: 'incidentDate',
    fixed: 'left',
    render: (field) => formattedDate(field, 'DD/MM/YYYY')
  },
  {
    title: 'Veículo',
    dataIndex: 'vehicle',
    key: 'vehicle',
    fixed: 'left',
    render: (vehicle) => vehicle?.plate
  },
  {
    title: 'Tipo de incidente',
    dataIndex: 'incidentType',
    key: 'incidentType',
    fixed: 'left',
    render: (incidentType) => (
      <Tag color={colors[incidentType]}>{chartSettings[incidentType]}</Tag>
    )
  },
  {
    title: 'Descrição do incidente',
    dataIndex: 'incidentDescription',
    key: 'incidentDescription',
    fixed: 'left',
    render: (incidentDescription) => <small>{incidentDescription}</small>
  },
  {
    title: 'Operação',
    dataIndex: 'operation',
    key: 'operation',
    fixed: 'left',
    render: (operation) => (
      <>
        {operation && operation.name} <br />
        <small>
          {operation && operation.company && operation.company.name} /{' '}
          {cnpj.format(
            operation && operation.company && operation.company.document
          )}
        </small>
      </>
    )
  }
]

const IncidentList = ({ rows, count, current, loading, handleChange }) => {
  return (
    <Table
      columns={columns}
      dataSource={rows}
      loading={loading}
      onChange={handleChange}
      pagination={{
        total: count,
        current: current,
        pageSize: 10
      }}
    />
  )
}

export default IncidentList
