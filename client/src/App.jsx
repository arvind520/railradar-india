import { useState } from 'react'

function App() {
  const [message, setMessage] = useState('Location not enabled')
  const [location, setLocation] = useState(null)

  function handleLocationClick() {
    setMessage('Requesting your location...')

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setLocation({
          latitude: latitude,
          longitude: longitude,
        })

        setMessage('Location found successfully!')
      },
      () => {
        setMessage('Unable to get your location')
      }
    )
  }

  return (
    <div>
      <h1>🚆 RailRadar India</h1>

      <p>Discover Indian trains around your location.</p>

      <p>{message}</p>

      {location && (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
        </div>
      )}

      <button onClick={handleLocationClick}>
        Allow Location
      </button>
    </div>
  )
}

export default App