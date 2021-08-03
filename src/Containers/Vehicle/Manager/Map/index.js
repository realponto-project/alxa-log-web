import React from 'react'
import { MapContainer,TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const MyMap = () => {
  const position = [51.505, -0.09]
  const stylesMapBox = [
    "light-v10",
    "dark-v10",
    "streets-v11",
    "outdoors-v11",
    "satellite-v9",
    "satellite-streets-v11",
    "navigation-preview-day-v4",
    "navigation-preview-night-v4",
    "navigation-guidance-day-v4",
    "navigation-guidance-night-v4",
  ];

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "500px" }}
    >
    <TileLayer
      url={`https://api.mapbox.com/styles/v1/mapbox/${stylesMapBox[3]}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
    /> 
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker> 
  </MapContainer>
  )
}

export default MyMap
