import leaflet from 'leaflet'

import truckPin from '../../../Assets/truckPin.svg'

export const mapIcon = leaflet.icon({
  iconUrl: truckPin,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50]
})
