import React, { useState } from 'react'
import { Button, Card, Col, Input, Row, Typography } from 'antd'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'

import MyTeamForm from '../MyTeamForm'
import MyTeamList from './MyTeamList'

const { Title } = Typography

const Manager = ({
  loading,
  source,
  handleSubmit,
  handleSelectedMyTeam,
  myTeamSelected,
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
  
  const showModalEditMyTeam = (value) => {
    handleSelectedMyTeam(value)
    setShowModal(true)
  }

  return (
    <Row gutter={[8, 16]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={12}>
              <Title style={{ marginBottom: 0 }} level={4}>
                Adicione novos usuários
              </Title>
              <p style={{ marginBottom: 0 }}>Crie e gerencie os seus usuários</p>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                onClick={openModal}
                style={{ marginRight: '16px' }}
                icon={<PlusOutlined />}>
                Adicionar usuário
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
                placeholder="Filtre pela nome ou cpf."
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
          <MyTeamList 
            datasource={source} 
            handleClickEdit={showModalEditMyTeam}
            loading={loading}
            handleChangeTableEvent={handleChangeTableEvent}
            offset={offset}
          />
        </Card>
      </Col>
  
      {
        showModal && (
          <MyTeamForm
            handleCancel={setShowModal}
            visible={showModal}
            handleSubmit={handleSubmit}
            myTeamSelected={myTeamSelected}
            handleSelectedMyTeam={handleSelectedMyTeam}
            handleEdit={handleEdit}
          />
        )
      }
    </Row>
  )
}

export default Manager
