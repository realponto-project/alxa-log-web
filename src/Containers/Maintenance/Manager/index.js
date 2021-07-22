import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography, Modal } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import Voucher from '../../../Components/Voucher'

import MaintenanceForm from '../MaintenanceForm'
import MaintenanceList from './MaintenanceList'

const { Title } = Typography

const Manager = ({
  loading,
  vehiclesSource,
  branchsSource,
  driversSource,
  operationsSource,
  maintenanceOrdersSource,
  handleSubmit,
  handleSelectedMaintenance,
  maintenanceSelected,
  handleEdit,
  handleFilter,
  searchValue,
  handleFilterOnchange,
  clearFilter,
  handleChangeTableEvent,
  offset,
  gotoDetail
}) => {
  const [showModal, setShowModal] = useState(false)
  const [showVoucher, setShowVoucher] = useState(false)

  const openModal = () => setShowModal(true)
  
  const showModalEditMaintenance = (value) => {
    handleSelectedMaintenance(value)
    setShowModal(true)
  }

  const handleShowVoucher = (value) => {
    handleSelectedMaintenance(value)
    setShowVoucher(true)
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicionar novas manutenções
              </Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie manutenções dos veículos de sua filial</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={openModal}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar manutenção
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
                placeholder="Filtre pela placa da manutenção."
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
          <MaintenanceList 
            datasource={maintenanceOrdersSource} 
            handleClickEdit={showModalEditMaintenance}
            handleShowVoucher={handleShowVoucher}
            loading={loading}
            handleChangeTableEvent={handleChangeTableEvent}
            offset={offset}
            gotoDetail={gotoDetail}
          />
        </Card>
      </Col>
      {
        maintenanceSelected && (
          <Modal 
            width={380} 
            footer={false} 
            visible={showVoucher} 
            onCancel={() => {
              setShowVoucher(false)
              handleSelectedMaintenance(null)
            }}
          >
            <Voucher maintenanceSelected={maintenanceSelected} />
          </Modal>
        )
      }
      {
        showModal && (
          <MaintenanceForm
            handleCancel={setShowModal}
            visible={showModal}
            branchsSource={branchsSource}
            driversSource={driversSource}
            vehiclesSource={vehiclesSource}
            operationsSource={operationsSource}
            handleSubmit={handleSubmit}
            maintenanceSelected={maintenanceSelected}
            handleSelectedMaintenance={handleSelectedMaintenance}
            handleEdit={handleEdit}
          />
        )
      }
    </Row>
  )
}

export default Manager
