import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

import BranchForm from '../BranchForm'
import BranchList from './BranchList'

const { Title } = Typography

const Manager = ({
  handleSelectedBranch,
  branchSelected,
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
  goToDetail
}) => {
  const [showModal, setShowModal] = useState(false)
  const openModal = () => setShowModal(true)
  
  const showModalEditBranch = (value) => {
    handleSelectedBranch(value)
    setShowModal(true)
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicione novas unidade
              </Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie as unidades</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={openModal}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar unidade
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
                placeholder="Filtre pela nome ou cnpj."
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
          <BranchList 
            handleChangeTableEvent={handleChangeTableEvent}
            datasource={source} 
            handleClickEdit={showModalEditBranch}
            loading={loading}
            offset={offset}
            goToDetail={goToDetail}
          />
        </Card>
      </Col>
  
      {
        showModal && (
          <BranchForm
            handleCancel={setShowModal}
            visible={showModal}
            handleSubmit={handleSubmit}
            branchSelected={branchSelected}
            handleSelectedBranch={handleSelectedBranch}
            handleEdit={handleEdit}
          />
        )
      }
    </Row>
  )
}

export default Manager
