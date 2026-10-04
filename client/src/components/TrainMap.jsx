// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// function TrainMap({ location }) {
//   const defaultPosition = [28.6139, 77.2090]

//   const mapPosition = location
//     ? [location.latitude, location.longitude]
//     : defaultPosition

//   return (
//     <MapContainer
//       center={mapPosition}
//       zoom={13}
//       style={{ height: '400px', width: '100%' }}
//     >
//       <TileLayer
//         attribution='&copy; OpenStreetMap contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />

//       <Marker position={mapPosition}>
//         <Popup>
//           {location ? 'Your current location' : 'Default map location'}
//         </Popup>
//       </Marker>
//     </MapContainer>
//   )
// }

// export default TrainMap

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'

function RecenterMap({ position }) {
  const map = useMap()

  useEffect(() => {
    map.flyTo(position, 13)
  }, [position, map])

  return null
}

function TrainMap({ location }) {
  const defaultPosition = [28.6139, 77.2090]

  const mapPosition = location
    ? [location.latitude, location.longitude]
    : defaultPosition

  return (
    <MapContainer
      center={mapPosition}
      zoom={13}
      style={{ height: '400px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={mapPosition}>
        <Popup>
          {location ? 'Your current location' : 'Default map location'}
        </Popup>
      </Marker>

      <RecenterMap position={mapPosition} />
    </MapContainer>
  )
}

export default TrainMap