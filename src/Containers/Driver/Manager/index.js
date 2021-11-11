import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { map } from 'ramda'

import DriverForm from '../DriverForm'
import DriverList from './DriverList'
import DateSVG from '../../../Assets/date.svg'
import CircleBar from '../../../Components/circleBar'
import ModalUpdateDates from '../DriverForm/updateDates'

const { Link, Title, Text } = Typography

const CardStatus = ({ title, count, srcImage, total, redirectPage }) => (
  <Card
    style={{
      borderRadius: 5,
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)'
    }}>
    <Row align="middle" justify="space-between">
      <Col span={12}>
        <Text style={{ fontSize: '1rem' }}>{title}</Text>
        <Title level={1} style={{ margin: 0, padding: 0 }}>
          {count > 0 ? count : '-'}
        </Title>
      </Col>
      <Col span={12}>
        <CircleBar icon={srcImage} total={total} count={count} />
      </Col>
      <Col span={24}>
        <Link onClick={redirectPage}>Detalhes</Link>
      </Col>
    </Row>
  </Card>
)

const Manager = ({
  handleSelectedDriver,
  form,
  driverSelected,
  loading,
  source,
  handleSubmit,
  handleEdit,
  handleFilter,
  searchValue,
  handleFilterOnchange,
  clearFilter,
  handleChangeTableEvent,
  offset,
  goToDetail,
  handleClickCard
}) => {
  const [showModal, setShowModal] = useState(false)
  const [showModalUpdateDates, setShowModalUpdateDates] = useState(false)
  const openModal = () => setShowModal(true)
  const showModalEditDriver = (value) => {
    handleSelectedDriver(value)
    setShowModal(true)
  }
  const showModalEditDate = (value) => {
    handleSelectedDriver(value)
    setShowModalUpdateDates(true)
  }
  const settingsCards = [
    {
      key: 'expireDriverLicense',
      title: 'CNH vencida',
      count: source.countExpireDriverLicense
    },
    { key: 'expireASO', title: 'ASO vencida', count: source.countExpireASO },
    {
      key: 'expireProtocolInsuranceCompany',
      title: 'Protocolo de segurança vencido',
      count: source.countExpireProtocolInsuranceCompany
    }
  ]

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicione novos motoristas
              </Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie os motoristas</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={openModal}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar motorista
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>

      {map(
        ({ title, count, key }) => (
          <Col key={key} span={8}>
            <CardStatus
              redirectPage={() => handleClickCard(key)}
              total={source.count}
              count={count}
              title={title}
              // srcImage={<CalendarOutlined />}
              srcImage={DateSVG}
            />
          </Col>
        ),
        settingsCards
      )}

      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={16}>
              <Input
                name="search_name_or_document"
                placeholder="Filtre pela nome ou cnh."
                prefix={<SearchOutlined />}
                value={searchValue}
                onChange={handleFilterOnchange}
              />
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Button style={{ marginRight: '16px' }} onClick={clearFilter}>
                Limpar filtros
              </Button>
              <Button type="primary" onClick={handleFilter}>
                Filtrar
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <DriverList
            datasource={source}
            handleClickEdit={showModalEditDriver}
            handleClickEditDate={showModalEditDate}
            loading={loading}
            handleChangeTableEvent={handleChangeTableEvent}
            offset={offset}
            goToDetail={goToDetail}
            handleEdit={handleEdit}
          />
        </Card>
      </Col>

      {showModal && (
        <DriverForm
          form={form}
          handleCancel={setShowModal}
          visible={showModal}
          handleSubmit={handleSubmit}
          driverSelected={driverSelected}
          handleSelectedDriver={handleSelectedDriver}
          handleEdit={handleEdit}
        />
      )}

      {driverSelected && (
        <ModalUpdateDates
          setShowModal={setShowModalUpdateDates}
          visible={showModalUpdateDates}
          handleSubmit={handleEdit}
          driverSelected={driverSelected}
        />
      )}
    </Row>
  )
}

export default Manager
