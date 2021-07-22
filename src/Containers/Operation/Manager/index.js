import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

import OperationForm from '../OperationForm'
import OperationList from './OperationList'

const { Title } = Typography

const Manager = ({
  loading,
  source,
  branchsSource,
  handleSubmit,
  handleSelectedOperation,
  operationSelected,
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
  
  const showModalEditOperation = (value) => {
    handleSelectedOperation(value)
    setShowModal(true)
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicionar novas operações
              </Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie suas operações</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={openModal}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar operação
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
                placeholder="Filtre pelo nome da operação."
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
          <OperationList 
            datasource={source} 
            handleClickEdit={showModalEditOperation}
            loading={loading}
            handleChangeTableEvent={handleChangeTableEvent}
            offset={offset}
            goToDetail={goToDetail}
          />
        </Card>
      </Col>
      {
        showModal && (
          <OperationForm
            handleCancel={setShowModal}
            visible={showModal}
            branchsSource={branchsSource}
            handleSubmit={handleSubmit}
            operationSelected={operationSelected}
            handleSelectedOperation={handleSelectedOperation}
            handleEdit={handleEdit}
          />
        )
      }
    </Row>
  )
}

export default Manager
