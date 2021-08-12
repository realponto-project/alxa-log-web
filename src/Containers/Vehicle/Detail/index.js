import React from 'react'
import { Card, Col, Row, Tag, Typography, Image } from 'antd'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import moment from 'moment'

import { mapIcon } from '../../../Components/Map/Icons'
import { length, pathOr } from 'ramda'
import WhitoutTrackSvg from './whitoutTrack.svg'

const { Title, Text } = Typography

const renderSituation = (situation) => {
  return {
    regular: 'Regular',
    unregular: 'Irregular',
  }[situation]
}

const Location = ({ tracks , plate}) => {

  const latitude = pathOr(-23.7056163, [0, 'gpsLatitude'], tracks)
  const longitude = pathOr(-46.5404382, [0, 'gpsLongitude'], tracks)
  const position = [latitude, longitude]
  if (length(tracks) === 0) {
    return (
      <Card bordered={false} style={{ height: "330px" }}>
        <Image src={WhitoutTrackSvg} width="100%" preview={false} alt="vehicle whitout track!" />
      </Card>
    )
  }

  return (
    <Card bordered={false} style={{ height: "330px" }}>
      <MapContainer
        center={position}
        zoom={16}
        style={{ width: '100%', height: 280 }}
      >
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        />
          <Marker icon={mapIcon} position={position}>
            <Popup>{plate}</Popup>
          </Marker>
      </MapContainer>
    </Card>
  )
}

const Detail = ({ vehicle }) => {
  const tracks = pathOr([], ['tracks'], vehicle)
  const odometer = pathOr(0, [0, 'odometer'], tracks)

  return (
    <Row gutter={[8, 8]}>
      <Col span={8}>
        <Location tracks={tracks} plate={vehicle.plate} />
      </Col>
      <Col span={16}>
        <Card bordered={false} style={{ height: "330px" }}>
          <Row gutter={[8, 24]}>
            <Col span={24}>
              <Title level={4}>Detalhes</Title>
            </Col>

            <Col span={6}>
              <Text>Placa</Text>
              <br />
              <Text>
                <strong>{vehicle.plate}</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Frota</Text>
              <br />
              <Text>
                <strong>{vehicle.fleet}</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Tipo de veículo</Text>
              <br />
              <Text>
                <strong>{vehicle?.vehicleType?.name ?? '-'}</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Status</Text>
              <br />
              <Text>
                <strong>{vehicle.activated ? (
                  <Tag color="#268E86">Ativo</Tag>
                ) : (
                  <Tag color="#EA5656">Inativo</Tag>
                )}</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Situação</Text>
              <br />
              <Text>
                <strong>{renderSituation(vehicle.situation)}</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Número rastreador</Text>
              <br />
              <Text>
                <strong>{vehicle?.serialNumber ?? '-'}</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Km atual</Text>
              <br />
              <Text>
                <strong>{odometer} Km</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Última manutenção</Text>
              <br />
              <Text>
                <strong>{moment(vehicle.lastMaintenance).format('DD/MM/YYYY')}</strong>
              </Text>
            </Col>
          </Row>
        </Card>
      </Col>

    </Row>
  )
}

export default Detail
