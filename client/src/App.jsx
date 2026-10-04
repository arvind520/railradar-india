
import { useState } from 'react'
import Header from './components/Header'
import LocationCard from './components/LocationCard'
import TrainMap from './components/TrainMap'
import './App.css'

function App() {
  // Store the status message shown to the user.
  const [message, setMessage] = useState('Location not enabled')

  // Store coordinates and the browser's estimated accuracy.
  const [location, setLocation] = useState(null)

  // Track whether the browser is currently finding the location.
  const [loading, setLoading] = useState(false)

  // Warn when the estimated accuracy radius is greater than 1 km.
  const accuracyWarning =
    location !== null && location.accuracy > 1000

  function handleLocationClick() {
    // Show loading feedback while the browser gets the location.
    setLoading(true)
    setMessage('Finding your location...')

    // Request the current position from the browser.
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // Extract the returned coordinates.
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        // Accuracy is an estimated radius in meters.
        const accuracy = position.coords.accuracy

        // Save all location details in React state.
        setLocation({
          latitude,
          longitude,
          accuracy,
        })

        // Show a warning-friendly status message.
        setMessage(
          `Location found. Estimated accuracy: ${Math.round(accuracy)} m`
        )

        // Finish the loading state.
        setLoading(false)
      },
      (error) => {
        // Give the user a useful message for each common error.
        if (error.code === 1) {
          setMessage('Location permission denied. Please allow access.')
        } else if (error.code === 2) {
          setMessage('Location unavailable. Please try again.')
        } else if (error.code === 3) {
          setMessage('Location request timed out. Please try again.')
        } else {
          setMessage('Unable to get your location.')
        }

        // Finish loading when the request fails.
        setLoading(false)
      },
      {
        // Ask the device to prioritize a more accurate position.
        enableHighAccuracy: true,

        // Allow up to 15 seconds for the location request.
        timeout: 15000,

        // Do not accept an old cached location.
        maximumAge: 0,
      }
    )
  }

  // Keep this array empty until real train data is available.
  // Later, the backend can provide the train coordinates and details.
  const trains = []

  return (
    <div className="app">
      <Header />

      <main className="app-main">
        <p className="app-intro">
          Discover Indian trains around your location.
        </p>

        {/* Let the user request their current location. */}
        <LocationCard
          message={message}
          location={location}
          onLocationClick={handleLocationClick}
          loading={loading}
        />

        {/* Warn when the reported location is too approximate. */}
        {accuracyWarning && (
          <div className="accuracy-warning" role="alert">
            <strong>Location may be inaccurate</strong>
            <p>
              Your device reports an accuracy radius of about{' '}
              {Math.round(location.accuracy)} meters.
              Move to an area with a better location signal and try again.
            </p>
          </div>
        )}

        {/* Show the map and provide train data for its marker layer. */}
        <section className="map-section">
          <h2>Map view</h2>
          <TrainMap location={location} trains={trains} />
        </section>
      </main>
    </div>
  )
}

export default App