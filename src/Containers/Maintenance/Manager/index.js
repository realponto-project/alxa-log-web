import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography, Modal, Space, Checkbox, DatePicker } from 'antd'
import { SearchOutlined, PlusOutlined, DownOutlined, UpOutlined } from '@ant-design/icons'
import Voucher from '../../../Components/Voucher'
import MaintenanceForm from '../MaintenanceForm'
import MaintenanceList from './MaintenanceList'
import styles from './style.module.css'

const { RangePicker } = DatePicker
const { Title } = Typography
const statusFilters = [
  { value: 'cancel', label: 'Cancelado' },
  { value: 'solicitation', label: 'Solicitação' },
  { value: 'check-in', label: 'Entrada' },
  { value: 'avaiable', label: 'Liberado' },
  { value: 'parking', label: 'Estacionar' },
  { value: 'courtyard', label: 'Pátio' },
  { value: 'awaiting_repair', label: 'Aguardando peça' },
  { value: 'dock', label: 'Doca' },
  { value: 'wash', label: 'Lavar' },
  { value: 'supply', label: 'Abastecer' },
  { value: 'check-out', label: 'Saída' },
]

const priorityFilters = [
  { value: 'low', label: 'Baixo' },
  { value: 'high', label: 'Alto' },
  { value: 'medium', label: 'Média' },
]

const services = [
  { value: 'corrective', label: 'Corretiva' },
  { value: 'preventive', label: 'Preventiva' },
]

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
  gotoDetail,
  checkBoxDefaultValues,
  handleCancelOrder
}) => {
  const [showModal, setShowModal] = useState(false)
  const [showVoucher, setShowVoucher] = useState(false)
  const [moreFilters, setMoreFilters] = useState(false)

  const openModal = () => setShowModal(true)
  
  const showModalEditMaintenance = (value) => {
    handleSelectedMaintenance(value)
    setShowModal(true)
  }

  const handleShowVoucher = (value) => {
    handleSelectedMaintenance(value)
    setShowVoucher(true)
  }

  const handleShowFilters = () => setMoreFilters(!moreFilters)

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
            <Col span={6}>
              <RangePicker
                format='DD/MM/YYYY'
                value={checkBoxDefaultValues.dates}
                placeholder=""
                allowClear={false}
                onChange={(value) =>
                  handleFilterOnchange({ target: { name: 'dates', value } })
                }
              />
            </Col>
            <Col span={10}>
              <Input
                name="plate"
                placeholder="Filtre pela placa da manutenção."
                prefix={<SearchOutlined />}
                value={searchValue.plate}
                onChange={handleFilterOnchange}
              />
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <Space>
                <Button onClick={handleShowFilters}>
                  Mais filtros
                  {moreFilters ? <UpOutlined /> : <DownOutlined />}
                </Button>
                <Button onClick={clearFilter}>
                  Limpar filtros
                </Button>
                <Button type="primary" onClick={handleFilter}>
                  Filtrar
                </Button>
              </Space>
            </Col>
            { moreFilters && (
               <Col span={24}>
                <div className={styles.filterWrapper}>
                  <Row>
                    <Col span={10}>
                      <Title level={5}>Status</Title>
                      <Checkbox.Group 
                        style={{ width: '100%' }} 
                        onChange={value => handleFilterOnchange({ target: { name: 'status', value } })}
                        defaultValue={checkBoxDefaultValues.status}
                        value={searchValue.status}
                      >
                        <Row gutter={[8, 8]}> 
                          {statusFilters.map(({ value, label }) => (
                            <Col span={12} key={value}>
                              <Checkbox value={value}>{label}</Checkbox>
                            </Col>
                          ))}
                        </Row>
                      </Checkbox.Group>
                    </Col>
                    <Col span={8}>
                      <Title level={5}>Prioridade</Title>
                      <Checkbox.Group 
                        style={{ width: '100%' }} 
                        onChange={value => handleFilterOnchange({ target: { name: 'priorities', value } })}
                        defaultValue={checkBoxDefaultValues.priorities}
                        value={searchValue.priorities}
                      >
                        <Row gutter={[8, 8]}>
                          {priorityFilters.map(({ value, label }) => (
                            <Col span={24} key={value}>
                              <Checkbox value={value}>{label}</Checkbox>
                            </Col>
                          ))}
                        </Row>
                      </Checkbox.Group>
                    </Col>
                    <Col span={4}>
                      <Title level={5}>Serviço</Title>
                      <Checkbox.Group 
                        style={{ width: '100%' }} 
                        onChange={value => handleFilterOnchange({ target: { name: 'services', value } })}
                        defaultValue={checkBoxDefaultValues.services}
                        value={searchValue.services}
                      >
                        <Row gutter={[8, 8]}>
                          {services.map(({ value, label }) => (
                            <Col span={24} key={value}>
                              <Checkbox value={value}>{label}</Checkbox>
                            </Col>
                          ))}
                        </Row>
                      </Checkbox.Group>
                    </Col>
                  </Row>
                </div>
              </Col>
            )}
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
            handleCancelOrder={handleCancelOrder}
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
