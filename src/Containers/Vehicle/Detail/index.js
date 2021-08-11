import React from 'react'
import { Card, Col, Row, Tag, Typography } from 'antd'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import moment from 'moment'

import { mapIcon } from '../../../Components/Map/Icons'
import { length, pathOr } from 'ramda'

const { Title, Paragraph } = Typography

const renderSituation = (situation) => {
  return {
    regular: <Tag color="success">Regular</Tag>,
    unregular: <Tag color="error">Irregular</Tag>
  }[situation]
}

const Location = ({ tracks }) => {
  if (length(tracks) === 0) return null

  const latitude = pathOr(0, [0, 'gpsLatitude'], tracks)
  const longitude = pathOr(0, [0, 'gpsLongitude'], tracks)
  const position = [latitude, longitude]

  return (
    <Col span={24}>
      <Card bordered={false}>
        <MapContainer
          center={position}
          zoom={16}
          style={{ width: '100%', height: 280 }}
          dragging={false}
          touchZoom={false}
          zoomControl={false}
          scrollWheelZoom={false}
          doubleClickZoom={false}>
          <TileLayer
            url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
          />
          <Marker interactive={false} icon={mapIcon} position={position} />
        </MapContainer>
      </Card>
    </Col>
  )
}

const Detail = ({ vehicle }) => {
  const tracks = pathOr([], ['tracks'], vehicle)

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Card bordered={false}>
          <Row gutter={[8, 20]}>
            <Col span={24}>
              <Title level={4}>Detalhes</Title>
            </Col>

            <Col span={6}>
              <Paragraph>Placa</Paragraph>
              <Paragraph strong>{vehicle.plate}</Paragraph>
            </Col>
            <Col span={6}>
              <Paragraph>Frota</Paragraph>
              <Paragraph strong>{vehicle.fleet}</Paragraph>
            </Col>
            <Col span={6}>
              <Paragraph>Tipo de veículo</Paragraph>
              <Paragraph strong>{vehicle?.vehicleType?.name ?? '-'}</Paragraph>
            </Col>
            <Col span={3}>
              <Paragraph>Situação</Paragraph>
              <Paragraph strong>{renderSituation(vehicle.situation)}</Paragraph>
            </Col>
            <Col span={3}>
              <Paragraph>Status</Paragraph>
              <Paragraph strong>
                {vehicle.activated ? (
                  <Tag color="success">Ativo</Tag>
                ) : (
                  <Tag color="error">Inativo</Tag>
                )}
              </Paragraph>
            </Col>
            <Col span={8}>
              <Paragraph>Número do rastreador</Paragraph>
              <Paragraph strong>{vehicle?.serialNumber ?? '-'}</Paragraph>
            </Col>
            <Col span={8}>
              <Paragraph>Distância máxima entre as manutenções</Paragraph>
              <Paragraph strong>{vehicle.minKm} Km</Paragraph>
            </Col>
            <Col span={8}>
              <Paragraph>Última manutenção</Paragraph>
              <Paragraph strong>
                {moment(vehicle.lastMaintenance).format('DD/MM/YYYY')}
              </Paragraph>
            </Col>
          </Row>
        </Card>
      </Col>

      <Location tracks={tracks} />
    </Row>
  )
}

export default Detail
