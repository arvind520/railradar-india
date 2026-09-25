import { useState } from 'react'
import Header from './components/Header'
import LocationStatus from './components/LocationStatus'
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
      <Header />

      <p>Discover Indian trains around your location.</p>

      <LocationStatus message={message} location={location} />

      <button onClick={handleLocationClick}>
        Allow Location
      </button>
    </div>
  )
}

export default App