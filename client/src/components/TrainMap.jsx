
import { useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from 'react-leaflet'

// Move the map when the user's coordinates change.
function RecenterMap({ position }) {
  // Get the Leaflet map instance from the parent MapContainer.
  const map = useMap()

  // Extract coordinate values for stable effect dependencies.
  const latitude = position[0]
  const longitude = position[1]

  useEffect(() => {
    // Smoothly move the map to the new coordinates.
    map.flyTo([latitude, longitude], 13)
  }, [latitude, longitude, map])

  // This helper controls the map without rendering visible UI.
  return null
}

// Display train markers when train data becomes available.
function TrainMarkers({ trains }) {
  return (
    <>
      {/* Render one marker for each train in the supplied array. */}
      {trains.map((train) => (
        <Marker
          // A stable unique key helps React track each train.
          key={train.id}
          // Each train must provide latitude and longitude.
          position={[train.latitude, train.longitude]}
        >
          {/* Show train details when the marker is clicked. */}
          <Popup>
            <strong>{train.name}</strong>
            <br />
            Train number: {train.trainNumber}
          </Popup>
        </Marker>
      ))}
    </>
  )
}

// Display the map, user's location, accuracy circle, and train layer.
function TrainMap({ location, trains = [] }) {
  // Use Delhi as the initial map center before location is available.
  const defaultPosition = [28.6139, 77.2090]

  // Use the user's coordinates when they have been obtained.
  const mapPosition = location
    ? [location.latitude, location.longitude]
    : defaultPosition

  return (
    <MapContainer
      // Set the initial map center and zoom level.
      center={mapPosition}
      zoom={13}
      // Use CSS to make the map height responsive.
      className="train-map"
    >
      {/* Load the map tiles from OpenStreetMap. */}
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Add a marker for the user's current location. */}
      {location && (
        <Marker position={mapPosition}>
          <Popup>
            <strong>Your location</strong>
            <br />
            Estimated accuracy: {Math.round(location.accuracy)} m
          </Popup>
        </Marker>
      )}

      {/* Draw a circle showing the browser's estimated accuracy radius. */}
      {location && (
        <Circle
          center={mapPosition}
          // Leaflet expects the radius in meters.
          radius={location.accuracy}
          // Use a translucent blue fill to distinguish the accuracy area.
          pathOptions={{
            color: '#2563eb',
            fillColor: '#60a5fa',
            fillOpacity: 0.2,
            weight: 2,
          }}
        />
      )}

      {/* Recenter when the user's coordinates change. */}
      {location && <RecenterMap position={mapPosition} />}

      {/* This layer is ready for train data from the backend later. */}
      <TrainMarkers trains={trains} />
    </MapContainer>
  )
}

export default TrainMap