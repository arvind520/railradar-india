import { useState } from 'react'
import Header from './components/Header'
import LocationCard from './components/LocationCard'
import TrainMap from './components/TrainMap'
function App() {
  const [message, setMessage] = useState('Location not enabled')
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(false)

  function handleLocationClick() {
    // Show a loading message while the browser finds your location.
    setLoading(true)
    setMessage('Finding your precise location...')
  
    // Ask the browser for the device's current location.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Read the coordinates returned by the browser.
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
  
        // The estimated horizontal accuracy, in meters.
        const accuracy = position.coords.accuracy
  
        // Save the coordinates so the map can update its marker and center.
        setLocation({
          latitude,
          longitude,
        })
  
        // Display the estimated accuracy for testing.
        setMessage(`Location found! Accuracy: ${Math.round(accuracy)} meters`)
  
        // Stop the loading state after receiving the location.
        setLoading(false)
      },
      (error) => {
        // Display a helpful message depending on the geolocation error.
        if (error.code === 1) {
          setMessage('Location permission denied. Please allow access.')
        } else if (error.code === 2) {
          setMessage('Location unavailable. Please try again.')
        } else if (error.code === 3) {
          setMessage('Location request timed out. Please try again.')
        } else {
          setMessage('Unable to get your location.')
        }
  
        // Stop the loading state when the request fails.
        setLoading(false)
      },
      {
        // Prioritize a more accurate location when the device supports it.
        enableHighAccuracy: true,
  
        // Give the browser up to 15 seconds to obtain a location.
        timeout: 15000,
  
        // Avoid reusing a cached position.
        maximumAge: 0,
      }
    )
  }

  return (
    <div>
      <Header />

      <p>Discover Indian trains around your location.</p>
      <LocationCard message={message} location={location} onLocationClick={handleLocationClick} loading={loading}/>

      <TrainMap location={location} />
    </div> 
  )
}

export default App