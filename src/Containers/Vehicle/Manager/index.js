import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

import VehicleForm from '../VehicleForm'
import VehicleList from './VehicleList'

const { Title } = Typography

const Manager = ({
  loading,
  source,
  vehicleTypesSource,
  handleSubmit,
  handleSelectedVehicle,
  vehicleSelected,
  handleEdit,
  handleFilter,
  searchValue,
  handleFilterOnchange,
  clearFilter,
  handleChangeTableEvent,
  offset,
}) => {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(true)
  
  const showModalEditVehicle = (value) => {
    handleSelectedVehicle(value)
    setShowModal(true)
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicione novos veículos
              </Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie os seus veículos</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={openModal}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar veículo
              </Button>
            </Col>
          </Row>
        </Card>
      </Col>
  
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={16}>
              <Input
                name="search_name_or_document"
                placeholder="Filtre pela placa ou frota."
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
          <VehicleList 
            datasource={source} 
            handleClickEdit={showModalEditVehicle}
            loading={loading}
            handleChangeTableEvent={handleChangeTableEvent}
            offset={offset}
          />
        </Card>
      </Col>
  
      {
        showModal && (
          <VehicleForm
            handleCancel={setShowModal}
            visible={showModal}
            vehicleTypesSource={vehicleTypesSource}
            handleSubmit={handleSubmit}
            vehicleSelected={vehicleSelected}
            handleSelectedVehicle={handleSelectedVehicle}
            handleEdit={handleEdit}
          />
        )
      }
    </Row>
  )
}

export default Manager
