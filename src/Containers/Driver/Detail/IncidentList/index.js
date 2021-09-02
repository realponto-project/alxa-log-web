import React from 'react'
import { Table, Tag } from 'antd'
import { cnpj } from 'cpf-cnpj-validator'

import formattedDate from '../../../../utils/parserDate'

const chartSettings = {
  collision: 'Colisão',
  accident: 'Acidente',
  vehicle_break_down: 'Veículo quebrado',
  refusal_of_freight: 'Recusa de frete',
  absence_without_justification: 'Falta sem Justificativa',
  absence_with_justification: 'Falta com justificativa',
  speeding: 'Excesso de velocidade',
  lack_of_PPE: 'Falta de EPI',
  lack_of_cargo_lashing: 'Falta de amarração da carga'
}

const colors = {
  collision: '#5DA0FC',
  accident: '#268E86',
  vehicle_break_down: '#2D2D2D',
  refusal_of_freight: '#1772C9',
  absence_without_justification: '#D588F2',
  absence_with_justification: '#F29F03',
  speeding: '#17C9B2',
  lack_of_PPE: '#7550D8',
  lack_of_cargo_lashing: '#F6C21F'
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
