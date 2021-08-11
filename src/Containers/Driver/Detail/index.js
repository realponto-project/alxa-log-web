import React, { useState } from 'react'
import { Row, Col, Card, Typography, Table, Button, Radio, Tag, Tooltip } from 'antd'
import { PlusOutlined, BarChartOutlined, DatabaseOutlined } from '@ant-design/icons'
import { cnpj } from 'cpf-cnpj-validator'

import IncidentForm from './IncidentForm'
import BarChart from './BarChart'
import AuthorizationForm from './AuthorizationForm'
import AuthorizationList from './Authorizations'
import formattedDate from '../../../utils/parserDate'

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
    render: (_, source) => source.vehicle && source.vehicle.plate
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
    render: (_, source) => (
      <>
        {source.operation && source.operation.name} <br />
        <small>
          {source.operation &&
            source.operation.company &&
            source.operation.company.name}{' '}
          /{' '}
          {cnpj.format(
            source.operation &&
              source.operation.company &&
              source.operation.company.document
          )}
        </small>
      </>
    )
  }
]

const { Link, Text, Title } = Typography

const Detail = ({
  driver,
  vehiclesSource,
  operationsSource,
  handleSubmit,
  chartData,
  handleSubmitAuthorization,
  handleSubmitUpdateAuthorization
}) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalAuthorization, setShowModalAuthorization] = useState(false)
  const [mode, setMode] = useState('table')
  const { origin } = window.location
  const [copy, setCopy] = useState(false)

  const handleChange = ({ target }) => setMode(target.value)

  const link = `${origin}/#/mobile-driver/${driver.id}`

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Title level={4}>Detalhes</Title>
            </Col>
            <Col span={8}>
              <Text>Nome</Text>
              <br />
              <Text>
                <strong>{driver.name || '-'}</strong>
              </Text>
            </Col>
            <Col span={6}>
              <Text>CNH</Text>
              <br />
              <Text>
                <strong>{driver.driverLicense}</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Telefone</Text>
              <br />
              <Text>{driver.phone}</Text>
            </Col>

            <Col span={4}>
              <Text>Link</Text>
              <br />
              {driver.id && (
                <Tooltip placement="bottom" title="Link copiado!" visible={copy}>
                  <Button
                    style={{ paddingLeft: 0 }}
                    type="link"
                    onClick={() => {
                      setCopy(true)
                      navigator.clipboard.writeText(link)
                      setTimeout(() => setCopy(false), 1000)
                    }}>
                    Copiar link
                  </Button>
                </Tooltip>
              )}
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicione autorizações
              </Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie autorizações dos motoristas</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={() => setShowModalAuthorization(true)}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar autorização
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={24} style={{ textAlign: 'right' }}>
              <AuthorizationList
                datasource={driver.authorizations}
                handleSubmitUpdateAuthorization={handleSubmitUpdateAuthorization}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicione incidentes
              </Title>
              <p style={{ marginBottom: 0 }}>
                Crie e gerencie incidentes dos motoristas
              </p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={() => setShowModal(true)}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar incidente
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={24} style={{ textAlign: 'right', marginBottom: '20px' }}>
              <Radio.Group onChange={handleChange} value={mode}>
                <Radio.Button value="table">
                  <DatabaseOutlined />
                </Radio.Button>
                <Radio.Button value="chart">
                  <BarChartOutlined />
                </Radio.Button>
              </Radio.Group>
            </Col>
            <Col span={24}>
              {mode === 'table' ? (
                <Table columns={columns} dataSource={driver.driverIncidents} />
              ) : (
                <BarChart data={chartData} />
              )}
            </Col>
          </Row>
        </Card>
      </Col>

      {
        showModal && (
          <IncidentForm
            handleCancel={setShowModal}
            visible={showModal}
            vehiclesSource={vehiclesSource}
            operationsSource={operationsSource}
            handleSubmit={handleSubmit}
            vehiclesSource={vehiclesSource}
            operationsSource={operationsSource}
          />
        )
      }

      {
        showModalAuthorization && (
          <AuthorizationForm
            handleCancel={setShowModalAuthorization}
            visible={showModalAuthorization}
            vehiclesSource={vehiclesSource}
            operationsSource={operationsSource}
            handleSubmit={handleSubmitAuthorization}
            vehiclesSource={vehiclesSource}
            operationsSource={operationsSource}
          />
        )
      }

    </Row>
  )
}

export default Detail
