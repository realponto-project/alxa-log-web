import React, { useEffect, useState } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import useGeolocation from 'react-hook-geolocation'

import { getAllGeoLocation } from '../../../../Services/Vehicle'
import { mapIcon } from '../../../../Components/Map/Icons'

const LocationMarker = ({ latlng, plate }) => {
  const map = useMapEvents({})

  return latlng === null ? null : (
    <Marker 
      position={latlng} 
      icon={mapIcon}
      eventHandlers={{
        click: () => map.flyTo(latlng, 16)
      }}
    >
      <Popup>{plate}</Popup>
    </Marker>
  )
}

const MyMap = () => {
  const position = [-23.7056163, -46.5404382]
  const geolocation = useGeolocation()
  const [vehicles, setVehicles] = useState([])
  useEffect(() => {
    getAllGeoLocation().then(({ data }) => {
      setVehicles(data.rows)
    })
  }, [])

  if (!geolocation.latitude && !geolocation.error) {
    return <h1>loading...</h1>
  }

  return (
    <MapContainer
      center={position}
      zoom={6}
      scrollWheelZoom={false}
      style={{ width: '100%', height: '500px' }}>
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
      />
      {vehicles.map(({ plate = null, tracks = []}) => {
        if (tracks.length) {
          return (
            <LocationMarker 
              plate={plate}
              latlng={[tracks[0].gpsLatitude, tracks[0].gpsLongitude]}
            />
          )
        }
        return null
      })}
    </MapContainer>
  )
}

export default MyMap
