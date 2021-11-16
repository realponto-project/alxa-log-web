import React, { useEffect, useState } from "react";
import { Card, Col, Row, Typography, Image, Spin } from "antd";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import moment from "moment";
import { length, pathOr } from "ramda";
import { useThemeSwitcher } from 'react-css-theme-switcher'

import { mapIcon } from "../../../Components/Map/Icons";
import Tag from "../../../Components/Tag";
import WhitoutTrackSvg from "../../../Assets/whitoutTrack.svg";
import FilterMaintenence from "../../../Components/Filters/Maintenance";
import MaintenanceList from "./MaintenanceList";
import ModalAddSerialNumber from "./ModalAddSerialNumber";

const { Link, Title, Text } = Typography;

const renderSituation = (situation) => {
  return {
    regular: "Regular",
    unregular: "Irregular",
  }[situation];
};

const Location = ({ tracks, plate }) => {
  const latitude = pathOr(-23.7056163, [0, "gpsLatitude"], tracks);
  const longitude = pathOr(-46.5404382, [0, "gpsLongitude"], tracks);
  const position = [latitude, longitude];
  const { currentTheme, status } = useThemeSwitcher()
  
  if (length(tracks) === 0) {
    return (
      <Image
        src={WhitoutTrackSvg}
        style={{ 
          filter: currentTheme === 'dark' && 'invert(0.9)',
          padding: 10
          }}
        width="250px"
        preview={false}
        alt="vehicle whitout track!"
      />
    );
  }

  const [urlMap, setUrlMap] = useState(
    `https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  )
  

  useEffect(() => {
    const themeMap = {
      dark: 'navigation-guidance-night-v4',
      light: 'navigation-guidance-day-v4'
    }[currentTheme || 'light']

    const url = `https://api.mapbox.com/styles/v1/mapbox/${themeMap}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`

    setUrlMap(url)
  }, [currentTheme])

  if (status === 'loading') {
    return (
        <Spin />
    )
  }


  return (
    <MapContainer
      center={position}
      zoom={16}
      style={{ width: "100%", height: 280 }}
    >
      <TileLayer
        url={urlMap}
      />
      <Marker icon={mapIcon} position={position}>
        <Popup>{plate}</Popup>
      </Marker>
    </MapContainer>
  );
};

const Detail = ({
  addSerialNumber,
  clearFilter,
  closeModalAddSerialNumber,
  filterForm,
  gotoDetail,
  handleChangeTable,
  handleFilter,
  loading,
  maintenances,
  offset,
  showModalAddSerialNumber,
  vehicle,
  visibleAddSerialNumber,
}) => {
  const tracks = pathOr([], ["tracks"], vehicle);
  const odometer = pathOr(0, [0, "odometer"], tracks);

  return (
    <Row gutter={[8, 8]}>
      <Col span={8}>
        <Card
          bordered={false}
          bodyStyle={{ 
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // backgroundColor: '#fff'
           }}
          style={{
            height: "330px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Location tracks={tracks} plate={vehicle.plate} />
        </Card>
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
                <strong>{vehicle?.vehicleType?.name ?? "-"}</strong>
              </Text>
            </Col>

            <Col span={6}>
              <Text>Status</Text>
              <br />
              <Text>
                <strong>
                  {vehicle.activated ? (
                    <Tag color="#268E86">Ativo</Tag>
                  ) : (
                    <Tag color="#EA5656">Inativo</Tag>
                  )}
                </strong>
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

              {vehicle.serialNumber ? (
                <Text>
                  <strong>{vehicle?.serialNumber ?? "-"}</strong>
                </Text>
              ) : (
                <Link onClick={showModalAddSerialNumber}>Adicionar</Link>
              )}
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
                <strong>
                  {moment(vehicle.lastMaintenance).format("DD/MM/YYYY")}
                </strong>
              </Text>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <FilterMaintenence
            visibleSearchPlate={false}
            form={filterForm}
            handleFilter={handleFilter}
            clearFilter={clearFilter}
            vehicle={vehicle}
          />
        </Card>
      </Col>

      <Col span={24}>
        <Card bordered={false}>
          <Row>
            <Col span={24}>
              <MaintenanceList
                gotoDetail={gotoDetail}
                datasource={maintenances}
                loading={loading}
                handleChangeTableEvent={handleChangeTable}
                offset={offset}
              />
            </Col>
          </Row>
        </Card>
      </Col>
      <ModalAddSerialNumber
        handleCancel={closeModalAddSerialNumber}
        handleSubmit={addSerialNumber}
        loading={loading}
        visible={visibleAddSerialNumber}
      />
    </Row>
  );
};

export default Detail;
