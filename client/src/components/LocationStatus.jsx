function LocationStatus({ message, location }) {
    return (
      <section>
        <p>{message}</p>
  
        {location && (
          <div>
            <p>Latitude: {location.latitude}</p>
            <p>Longitude: {location.longitude}</p>
          </div>
        )}
      </section>
    )
  }
  
  export default LocationStatus