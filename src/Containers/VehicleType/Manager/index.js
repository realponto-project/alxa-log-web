import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

import VehicleTypeForm from '../VehicleTypeForm'
import VehicleTypeList from './VehicleTypeList'

const { Title } = Typography

const Manager = ({
  handleSelectedVehicleType,
  vehicleTypeSelected,
  loading,
  source,
  handleSubmit,
  handleEdit,
  handleFilter,
  searchValue,
  handleFilterOnchange,
  clearFilter,
  offset,
  handleChangeTableEvent,
}) => {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(true)
  
  const showModalEditVehicleType = (value) => {
    handleSelectedVehicleType(value)
    setShowModal(true)
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicione novos tipos de veículos
              </Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie seus tipos de veículo</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={openModal}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar tipo de veículo
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
                placeholder="Filtre pelo tipo de veículo."
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
          <VehicleTypeList 
            datasource={source} 
            handleClickEdit={showModalEditVehicleType}
            loading={loading}
            offset={offset}
            handleChangeTableEvent={handleChangeTableEvent}
          />
        </Card>
      </Col>
  
      {
        showModal && (
          <VehicleTypeForm
            handleCancel={setShowModal}
            visible={showModal}
            handleSubmit={handleSubmit}
            vehicleTypeSelected={vehicleTypeSelected}
            handleSelectedVehicleType={handleSelectedVehicleType}
            handleEdit={handleEdit}
          />
        )
      }
    </Row>
  )
}

export default Manager
