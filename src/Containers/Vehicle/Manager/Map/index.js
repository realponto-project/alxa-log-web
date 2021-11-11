import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import useGeolocation from "react-hook-geolocation";
import { useThemeSwitcher } from "react-css-theme-switcher";

import { getAllGeoLocation } from "../../../../Services/Vehicle";
import { mapIcon } from "../../../../Components/Map/Icons";
import styles from './style.module.css'
import { Spin } from "antd";

const LocationMarker = ({ latlng, plate }) => {
  const map = useMapEvents({});

  return latlng === null ? null : (
    <Marker
      position={latlng}
      icon={mapIcon}
      eventHandlers={{
        click: () => map.flyTo(latlng, 16),
      }}
    >
      <Popup>{plate}</Popup>
    </Marker>
  );
};

const MyMap = () => {
  const { currentTheme, status } = useThemeSwitcher();
  const position = [-23.7056163, -46.5404382];
  const geolocation = useGeolocation();
  const [vehicles, setVehicles] = useState([]);
  const [urlMap, setUrlMap] = useState(
    `https://api.mapbox.com/styles/v1/mapbox/navigation-guidance-day-v4/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`
  );

  useEffect(() => {
    getAllGeoLocation().then(({ data }) => {
      setVehicles(data.rows);
    });
  }, []);

  useEffect(() => {
    const themeMap = {
      dark: "navigation-guidance-night-v4",
      light: "navigation-guidance-day-v4",
    }[currentTheme || "light"];
    console.log(themeMap);

    const url = `https://api.mapbox.com/styles/v1/mapbox/${themeMap}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`;

    setUrlMap(url);
  }, [currentTheme]);

  if (
    (!geolocation.latitude && !geolocation.error) ||
    status === "loading"
  ) {
    return (
      <div className={styles.wrapperLoading}>
        <Spin />
      </div>
    )
  }

  return (
    <MapContainer
      center={position}
      zoom={6}
      scrollWheelZoom={true}
      style={{ width: "100%", height: "500px" }}
    >
      <TileLayer url={urlMap} />
      {vehicles.map(({ plate = null, tracks = [] }) => {
        if (tracks.length) {
          return (
            <LocationMarker
              plate={plate}
              latlng={[tracks[0].gpsLatitude, tracks[0].gpsLongitude]}
            />
          );
        }
        return null;
      })}
    </MapContainer>
  );
};

export default MyMap;
