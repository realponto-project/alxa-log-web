import React, { useEffect, useState } from 'react'
import { MapContainer,TileLayer, Marker, Popup, Circle, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import leaflet from "leaflet";
import useGeolocation from 'react-hook-geolocation'
import { map } from 'ramda';

import truckPin from './truckPin.png'
import { getAllGeoLocation } from '../../../../Services/Vehicle';

const mapIcon = leaflet.icon({
  iconUrl: truckPin,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

const MyMap = ({ }) => {
  const position= [-23.7056163, -46.5404382]
  const geolocation = useGeolocation()
  const [vehicles, setVehicles] = useState([])

  
  useEffect(() => {
    getAllGeoLocation().then(({ data }) => {
      setVehicles(data.rows);
    })
  }, [])


  if(!geolocation.latitude && !geolocation.error ){
    return <h1>loading...</h1>
  }

  const center = geolocation.latitude ? [geolocation.latitude, geolocation.longitude] : position

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "500px" }}
    >
    <TileLayer
      url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
    /> 
    {map((vehicle) => {
      if(vehicle.tracks?.length === 0) return

      const track = vehicle.tracks[0]

      return (
        <Marker position={[track.gpsLatitude, track.gpsLongitude]} icon={mapIcon}>
          <Popup closeButton={false}>
            {vehicle.plate}
          </Popup>
        </Marker>
        )
      }, vehicles)}

    {/* <Circle center={center} radius={10} /> */}
    <CircleMarker center={center} radius={2} />
  </MapContainer>
  )
}

export default MyMap
