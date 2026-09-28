import { useState } from 'react'
import Header from './components/Header'
import LocationCard from './components/LocationCard'
function App() {
  const [message, setMessage] = useState('Location not enabled')
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleLocationClick() {
    setLoading(true);
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
        setLoading(false);
      },
      () => {
        setMessage('Unable to get your location');
        setLoading(false);
      }
    )
  }

  return (
    <div>
      <Header />

      <p>Discover Indian trains around your location.</p>
      <LocationCard message={message} location={location} onLocationClick={handleLocationClick} loading={loading}/>

    </div> 
  )
}

export default App