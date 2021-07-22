import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

import DriverForm from '../DriverForm'
import DriverList from './DriverList'

const { Title } = Typography

const Manager = ({
  handleSelectedDriver,
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
}) => {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(true)
  
  const showModalEditDriver = (value) => {
    handleSelectedDriver(value)
    setShowModal(true)
  }

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
            loading={loading}
            handleChangeTableEvent={handleChangeTableEvent}
            offset={offset}
            goToDetail={goToDetail}
          />
        </Card>
      </Col>
  
      {
        showModal && (
          <DriverForm
            handleCancel={setShowModal}
            visible={showModal}
            handleSubmit={handleSubmit}
            driverSelected={driverSelected}
            handleSelectedDriver={handleSelectedDriver}
            handleEdit={handleEdit}
          />
        )
      }
    </Row>
  )
}

export default Manager
