import React from 'react'
import {
  Dropdown,
  Table,
  Button,
  Space,
  Tooltip,
  Typography,
  Col,
  Row,
  Menu
} from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import { map } from 'ramda'
import moment from 'moment'

const { Paragraph } = Typography

const columns = ({
  handleClickEdit,
  goToDetail,
  handleEdit,
  handleClickEditDate
}) => [
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    fixed: 'left'
  },
  {
    title: 'Cnh',
    dataIndex: 'driverLicense',
    key: 'driverLicense',
    fixed: 'left'
  },
  {
    title: 'RG',
    dataIndex: 'rg',
    key: 'rg',
    fixed: 'left'
  },
  {
    title: 'CPF',
    dataIndex: 'cpf',
    key: 'cpf',
    fixed: 'left'
  },
  {
    title: 'Telefone',
    dataIndex: 'phone',
    key: 'phone',
    fixed: 'left'
  },
  {
    title: 'Vínculo',
    dataIndex: 'bond',
    key: 'bond',
    fixed: 'left'
  },
  {
    title: 'Status',
    dataIndex: 'id',
    render: (_, source) => <>{source.activated ? 'Ativo' : 'Inativo'}</>
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) => (
      <Space>
        <Button type="link" onClick={() => handleClickEdit(source)}>
          Editar
        </Button>
        <Button type="link" onClick={() => goToDetail(source.id)}>
          Detalhes
        </Button>
        <Dropdown.Button
          type="link"
          overlay={
            <Menu>
              <Menu.Item onClick={() => handleClickEditDate(source)} key="1">
                Atualizar documento
              </Menu.Item>
            </Menu>
          }
        />
      </Space>
    )
  },
  {
    title: ' ',
    dataIndex: 'id',
    render: (_, source) => (
      <Tooltip
        placement="bottom"
        title={() => {
          return (
            <>
              <Row>
                <Col span={24}>
                  <Paragraph style={{ color: 'white' }}>
                    Validade documentos:
                  </Paragraph>
                </Col>
                <Row></Row>
                <Col>
                  <Paragraph style={{ color: 'white' }}>ASO - </Paragraph>
                </Col>
                <Col>
                  <Paragraph style={{ color: 'white' }}>
                    {moment().format() < source.expireASO
                      ? 'Regular'
                      : 'Expirado'}
                  </Paragraph>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Paragraph style={{ color: 'white' }}>CNH - </Paragraph>
                </Col>
                <Col>
                  <Paragraph style={{ color: 'white' }}>
                    {moment().format() < source.expireDriverLicense
                      ? 'Regular'
                      : 'Expirado'}
                  </Paragraph>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Paragraph style={{ color: 'white' }}>Protocolo - </Paragraph>
                </Col>
                <Col>
                  <Paragraph style={{ color: 'white' }}>
                    {moment().format() < source.expireProtocolInsuranceCompany
                      ? 'Regular'
                      : 'Expirado'}
                  </Paragraph>
                </Col>
              </Row>
            </>
          )
        }}>
        <InfoCircleOutlined />
      </Tooltip>
    )
  }
]

const DriverList = ({
  datasource,
  handleClickEdit,
  loading,
  handleChangeTableEvent,
  offset,
  goToDetail,
  handleClickEditDate,
  handleEdit
}) => {
  return (
    <Table
      pagination={{
        showSizeChanger: false,
        pageSize: 20,
        total: datasource.count,
        current: offset
      }}
      onChange={handleChangeTableEvent}
      columns={columns({
        handleClickEdit,
        goToDetail,
        handleEdit,
        handleClickEditDate
      })}
      loading={loading}
      dataSource={map((row) => ({ ...row, key: row.id }), datasource.rows)}
    />
  )
}

export default DriverList
