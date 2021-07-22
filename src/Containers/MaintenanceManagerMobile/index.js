import React from 'react'
import { Button, Image, Row, Col, Input, Typography, List } from 'antd'
import QrReader from 'react-qr-reader'
import QrCode from './qrcode.png'
import TypingPng from './typography.png'
import Modal from '../../Components/ModalMobile'
import { CloseOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const MaintenanceManagerMobile = ({
  searchVehicle,
  searchButton,
  handleScan,
  handleError,
  handleChange,
  handleClick,
  enableQrCode,
  setEnableQrCode,
  showModalMobile,
  setShowModalMobile,
  setSearchVehicle,
  setSearchButton,
}) => {
  return (
    <div style={{ overflow: "hidden", padding: "24px"}}>
      <Row>
        <Col span={24}>
          { enableQrCode ? (
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <QrReader
                  delay={300}
                  onError={handleError}
                  onScan={handleScan}
                  style={{ height: '100%' }}
                />
              </Col>
              <Col span={24}>
                  <Title level={4}>
                    Buscar com QR Code
                  </Title>
                  <Text>
                    Pocisione a câmera para um códido (QR Code). A leitura é automática ou clique em "Digitar placa do veículo abaixo"
                  </Text>
              </Col>
              <Col span={24}>
                <Button block size="large" onClick={() => { 
                  setEnableQrCode(false);
                  setShowModalMobile(true);
                }}>Digitar placa do veículo</Button>
              </Col>
            </Row>
          ) : (
            <Row gutter={[8, 8]} style={{ padding: "30px 0"}}>
              <Col span={24}>
                <Title level={3}>Buscar um Qr Code</Title>
              </Col>
              <Col span={24}>
                <List
                  itemLayout="horizontal"
                  dataSource={[
                    { 
                      title: "Ler QR code", 
                      image: QrCode, 
                      subtitle: "Use a câmera do celular", 
                      action: () => setEnableQrCode(true)
                    }, 
                    { 
                      title: "Insira a placa do Veículo", 
                      image: TypingPng, 
                      subtitle: "Para pesquisar a ordem de manutenção", 
                      action: () => { 
                        setShowModalMobile(true); 
                      }
                    }
                  ]}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Image src={item.image} width={50} height={50} preview={false} />}
                        title={<a onClick={item.action}>{item.title}</a>}
                        description={<a onClick={item.action}>{item.subtitle}</a>}
                      />
                    </List.Item>
                  )}
                />
                
              </Col>
            </Row>
          )
          }
          {showModalMobile && (
            <Modal show={showModalMobile}>
              <Row gutter={[8, 16]}>
                <Col span={24} style={{ textAlign: "right"}}>
                  <Button type="link" style={{ color: "#333" }} onClick={() => {
                    setShowModalMobile(false)
                    setSearchVehicle('')
                    setSearchButton(true)
                  }}><CloseOutlined /></Button>
                </Col>
                <Col span={24}>
                  <Title level={4}>
                    Buscar veículo pela placa
                  </Title>
                  <Text>
                    Digite a placa do veículo no input abaixo
                  </Text>
                </Col>
                <Col span={24}>
                  <Input value={searchVehicle} onChange={handleChange} />
                </Col>
                <Col span={24}>
                  <Button block size="large" onClick={handleClick} disabled={searchButton}>
                    Pesquisar placa do veículo
                  </Button>
                </Col>
              </Row>
            </Modal>
          )}
        </Col>
      </Row>
    </div>
  )
}

export default MaintenanceManagerMobile
