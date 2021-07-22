import React from 'react'
import { Row, Col, Card, Typography, Image, Tag, Timeline } from 'antd'
import fuelSVG from './fuel.svg'
import clockSVG from './clock.svg'
import leafSVG from './leaf.svg'
import diffTime from '../../../utils/permananceTime'
import formattedDate from '../../../utils/parserDate'
import { cnpj } from 'cpf-cnpj-validator'

const status = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta'
}

const parseStatusColor = {
  'solicitation': '#5DA0FC',
  'check-in': '#268E86',
  'avaiable': '#F29F03',
  'parking': '#1772C9',
  'courtyard': '#EA5656',
  'awaiting_repair': '#7550D8',
  'dock': '#2D2D2D',
  'wash': '#D588F2',
  'supply': '#17C9B2',
  'check-out': '#264ABE',
}

const services = {
  corrective: 'Corretiva',
  preventive: 'Preventiva'
}

const parseStatus = {
  'solicitation': 'Solicitação',
  'check-in': 'Entrada',
  'avaiable': 'Liberado',
  'parking': 'Estacionar',
  'courtyard': 'Pátio',
  'awaiting_repair': 'Aguardando peça',
  'dock': 'Doca',
  'wash': 'Lavar',
  'supply': 'Abastecer',
  'check-out': 'Saída',
}

const { Text, Title } = Typography 
const Detail = ({
  maintenanceOrder
}) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Title level={4}>Detalhes</Title>
            </Col>
            <Col span={6}>
              <Text>Placa cavalo</Text><br />
              <Text><strong>{maintenanceOrder.plateHorse || '-' }</strong></Text>
            </Col>
            <Col span={6}>
              <Text>Placa do veículo da manutenção</Text><br />
              <Text><strong>{maintenanceOrder.plateCart}</strong></Text>
            </Col>

            <Col span={4}>
              <Text>Status</Text><br />
              <Text>
                <Tag color={parseStatusColor[maintenanceOrder.status]}>{parseStatus[maintenanceOrder.status]}</Tag>
              </Text>
            </Col>
            <Col span={4}>
              <Text>Centro de custo </Text><br />
              <Text><strong>{maintenanceOrder.costCenter}</strong></Text>
            </Col>
            <Col span={4}>
              <Text>Prioridade </Text><br />
              <Text><strong>{status[maintenanceOrder.priority]}</strong></Text>
            </Col>
            <Col span={10}>
              <Text>Operação </Text><br />
              <Text>
                <strong>
                  {maintenanceOrder.operation.name} - {maintenanceOrder.operation.company.name} / {cnpj.format(maintenanceOrder.operation.company.document)}
                </strong>
              </Text>
            </Col>

            <Col span={10}>
              <Text>Manutenção realizada por</Text><br />
              <Text><strong>{maintenanceOrder.company.name} / {cnpj.format(maintenanceOrder.company.document)} </strong></Text>
            </Col>

            <Col span={4}>
              <Text>Tipo de Serviço</Text><br />
              <Text><strong>{services[maintenanceOrder.service]}</strong></Text>
            </Col>
            
            <Col span={24}>
              <Text>Descrição do serviço</Text><br />
              <Text><strong>{maintenanceOrder.serviceDescription}</strong></Text>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={8}>
        <Card bordered={false}>
          <Row>
            <Col span={16}>
              <Title level={1}>{maintenanceOrder.supplies.length}</Title>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={24} style={{ textAlign: "center"}}>
                  <Image src={fuelSVG} alt='fuel' height={72} />
                </Col>
                <Col span={24} style={{ textAlign: "center"}}>
                  <Text><strong>Abastecimentos</strong></Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          <Row>
            <Col span={16}>
              <Title level={1}>{maintenanceOrder.maintenanceOrderEvents.length}</Title>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={24} style={{ textAlign: "center"}}>
                  <Image src={leafSVG} alt='fuel' height={72} />
                </Col>
                <Col span={24} style={{ textAlign: "center"}}>
                  <Text><strong>Eventos</strong></Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
      <Col span={8}>
        <Card bordered={false}>
          <Row>
            <Col span={16}>
              <Title level={1}>{diffTime(maintenanceOrder.createdAt, maintenanceOrder.updatedAt, maintenanceOrder.status)}</Title>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={24} style={{ textAlign: "center"}}>
                  <Image src={clockSVG} alt='fuel' />
                </Col>
                <Col span={24} style={{ textAlign: "center"}}>
                  <Text><strong>Permanência</strong></Text>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Col>
  
      <Col span={12}>
        <Card bordered={false}>
        <Row gutter={[8, 8]}>
            <Col span={24}>
              <Title level={4}>Condutor #1</Title>
            </Col>
            <Col span={8}>
              <Text>Motorista da entrada</Text><br />
              <Text><strong>{maintenanceOrder.maintenanceOrderDrivers[0].driver.name}</strong></Text>
            </Col>
            <Col span={8}>
              <Text>CNH</Text><br />
              <Text><strong>{maintenanceOrder.maintenanceOrderDrivers[0].driver.driverLicense}</strong></Text>
            </Col>
            <Col span={8}>
              <Text>Telefone</Text><br />
              <Text><strong>{maintenanceOrder.maintenanceOrderDrivers[0].driver.phone}</strong></Text>
            </Col>
          </Row>
        </Card>
      </Col>

        
      <Col span={12}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Title level={4}>Condutor #2</Title>
            </Col>
            <Col span={8}>
              <Text>Motorista da saída</Text><br />
              <Text><strong>{maintenanceOrder.maintenanceOrderDrivers.length > 1 && maintenanceOrder.maintenanceOrderDrivers[1].driver.name || '-'}</strong></Text>
            </Col>
            <Col span={8}>
              <Text>CNH</Text><br />
              <Text><strong>{maintenanceOrder.maintenanceOrderDrivers.length > 1 && maintenanceOrder.maintenanceOrderDrivers[1].driver.driverLicense || '-'}</strong></Text>
            </Col>
            <Col span={8}>
              <Text>Telefone</Text><br />
              <Text><strong>{maintenanceOrder.maintenanceOrderDrivers.length > 1 && maintenanceOrder.maintenanceOrderDrivers[1].driver.phone || '-'}</strong></Text>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={12}>
        <Card bordered={false}>
          <Row gutter={[8, 8]}>
            <Col span={24}>
              <Title level={4}>Eventos</Title>
            </Col>
            <Col span={24}>
              <Timeline>
                {maintenanceOrder.maintenanceOrderEvents.map((item) => (
                  <Timeline.Item color="green" key={item.id}>
                    <p>{parseStatus[item.status]} <br /> {formattedDate(item.createdAt, 'DD/MM/YYYY HH:mm')}</p>
                  </Timeline.Item>
                ))}
              </Timeline>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={12}>
        <Card bordered={false}>
          <Row >
            <Col span={24}>
              <Title level={4}>Abastecimentos detalhes</Title>
            </Col>
            {maintenanceOrder.supplies.length === 0 && (
              <Text>Não há abastecimentos registrados nessa ordem!</Text>
            )}

            {maintenanceOrder.supplies.length > 0 && (
              <Col span={24}>
                <Row gutter={[8, 8]}>
                  <Col span={6}>
                    <Text>Combustível</Text><br />
                  </Col>
                  <Col span={6}>
                    <Text>Total de litros</Text><br />
                  </Col>
                  <Col span={6}>
                    <Text>Quilomêtragem</Text><br />
                  </Col>
                  <Col span={6}>
                    <Text>Hodometro</Text><br />
                  </Col>
                </Row>
              </Col>
            )}


            {maintenanceOrder.supplies.map(item => (
              <Col span={24} key={item.id}>
                <Row gutter={[8, 8]}>
                  <Col span={6}>
                    <Text><strong>{item.fuel === 'diesel' ? 'Diesel' : 'Arla'}</strong></Text>
                  </Col>
                  <Col span={6}>
                    <Text><strong>{item.totalLiters} lts</strong></Text>
                  </Col>
                  <Col span={6}>
                    <Text><strong>{item.km} km</strong></Text>
                  </Col>
                  <Col span={6}>
                    <Text><strong>{item.odometer}</strong></Text>
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
        </Card>
      </Col>

    </Row>
  )
}

export default Detail
