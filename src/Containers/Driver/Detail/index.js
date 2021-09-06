import React, { useState } from 'react'
import { Row, Col, Card, Typography, Button, Radio, Tooltip, Switch, Modal } from 'antd'
import {
  PlusOutlined,
  BarChartOutlined,
  DatabaseOutlined,
  LinkOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'

import IncidentForm from './IncidentForm'
import BarChart from './BarChart'
import AuthorizationForm from './AuthorizationForm'
import AuthorizationList from './Authorizations'
import FilterAuthorization from '../../../Components/Filters/Authorization'
import FilterIncident from '../../../Components/Filters/Incident'
import IncidentList from './IncidentList'
import formattedDate from '../../../utils/parserDate'

const { Text, Title } = Typography

const Detail = ({
  driver,
  vehiclesSource,
  operationsSource,
  handleSubmit,
  chartData,
  handleSubmitAuthorization,
  handleSubmitUpdateAuthorization,
  authorizations,
  clearFilterAuthorization,
  handleChangeTableAuthorization,
  handleFilterAuthorization,
  authorizationLoading,
  clearFilterIncident,
  handleFilterIncident,
  incidentsLoading,
  handleChangeTableIncident,
  incidents,
  handleClickEdit,
  incidentSelected,
  userId,
  handleEditSubmit,
  handleEdit
}) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalAuthorization, setShowModalAuthorization] = useState(false)
  const [mode, setMode] = useState('table')
  const { origin } = window.location
  const [copy, setCopy] = useState(false)

  const { confirm } = Modal

  const handleChange = ({ target }) => setMode(target.value)

  const link = `${origin}/#/mobile-driver/${driver.id}`

  const handleSelectedIncidents = (incident) => {
    handleClickEdit(incident)
    setShowModal(true)
  }

  const ModalStatus = (values) => {
    confirm({
      title: 'Deseja atualizar o status do motorista?',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: 'Cancelar',
      okType: 'danger',
      cancelText: 'Confirmar',
      onOk: () => console.log('cancelar'),
      onCancel: () => handleEdit({...values, activated: !values.activated})
    })
  }

  return (
    <Row gutter={[8, 8]}>
      <Col span={24} >
        <Card bordered={false}>
          <Row gutter={[8, 8]} style={{marginBottom: '25px'}}>
            <Col span={12}>
              <Title level={4}>Detalhes</Title>
            </Col>
            <Col span={12} align="right">
              <Switch 
                checkedChildren="Ativo" 
                unCheckedChildren="Inativo" 
                checked={driver.activated} 
                onChange={() => ModalStatus(driver)}
              />
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
                <strong>{driver.driverLicense || '-'}</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Telefone</Text>
              <br />
              <Text strong>{driver.phone || '-'}</Text>
            </Col>

            <Col span={4}>
              <Text>RG</Text>
              <br />
              <Text>
                <strong>{driver.rg || '-'}</strong>
              </Text>
            </Col>
          </Row>

          <Row gutter={[8, 8]} style={{marginBottom: '25px'}}>
            <Col span={8}>
              <Text>CPF</Text>
              <br />
              <Text>
                <strong>{driver.cpf || '-'}</strong>
              </Text>
            </Col>
            <Col span={6}>
              <Text>Validade CNH</Text>
              <br />
              <Text>
                <strong>{formattedDate(driver.expireDriverLicense, 'DD/MM/YYYY') || '-'}</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Protocolo seguradora</Text>
              <br />
              <Text strong>{driver.protocolInsuranceCompany || '-'}</Text>
            </Col>

            <Col span={4}>
              <Text>Validade protocolo</Text>
              <br />
              <Text strong>{formattedDate(driver.expireProtocolInsuranceCompany, 'DD/MM/YYYY') || '-'}</Text>
            </Col>
          </Row>

          <Row gutter={[8, 8]}>
            <Col span={8}>
              <Text>Validade ASO</Text>
              <br />
              <Text>
                <strong>{formattedDate(driver.expireASO, 'DD/MM/YYYY') || '-'}</strong>
              </Text>
            </Col>
            <Col span={6}>
              <Text>Curso MOP</Text>
              <br />
              <Text>
                <strong>{driver.mop ? 'Sim' : 'Não' || '-'}</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Vínculo</Text>
              <br />
              <Text strong>{driver.bond || '-'}</Text>
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
                    <LinkOutlined />
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
            {mode === 'table' && (
              <Col span={24}>
                <FilterIncident
                  operations={operationsSource}
                  clearFilter={clearFilterIncident}
                  handleSubmit={handleFilterIncident}
                />
              </Col>
            )}
            <Col span={24}>
              {mode === 'table' ? (
                <IncidentList
                  {...incidents}
                  handleChange={handleChangeTableIncident}
                  loading={incidentsLoading}
                  handleClickEdit={handleSelectedIncidents}
                  userId={userId}
                />
              ) : (
                <BarChart data={chartData} />
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
              <p style={{ marginBottom: 0 }}>
                Crie e gerencie autorizações dos motoristas
              </p>
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
            <Col span={24}>
              <FilterAuthorization
                operations={operationsSource}
                clearFilter={clearFilterAuthorization}
                handleSubmit={handleFilterAuthorization}
              />
            </Col>
            <Col span={24} style={{ textAlign: 'right' }}>
              <AuthorizationList
                datasource={authorizations.rows}
                handleChange={handleChangeTableAuthorization}
                handleSubmitUpdateAuthorization={
                  handleSubmitUpdateAuthorization
                }
                loading={authorizationLoading}
                pagination={{
                  total: authorizations.count,
                  current: authorizations.current
                }}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      
      {showModal && (
        <IncidentForm
          handleCancel={setShowModal}
          visible={showModal}
          vehiclesSource={vehiclesSource}
          operationsSource={operationsSource}
          handleSubmit={handleSubmit}
          incidentSelected={incidentSelected}
          handleEditSubmit={handleEditSubmit}
          handleSelectedIncident={handleClickEdit}
        />
      )}

      {showModalAuthorization && (
        <AuthorizationForm
          handleCancel={setShowModalAuthorization}
          visible={showModalAuthorization}
          vehiclesSource={vehiclesSource}
          operationsSource={operationsSource}
          handleSubmit={handleSubmitAuthorization}
        />
      )}
    </Row>
  )
}

export default Detail
