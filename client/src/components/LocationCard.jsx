import LocationStatus from "./LocationStatus";

function LocationCard({ message, location, onLocationClick, loading }) {
  return (
    <section>
      <h2>Find trains near you</h2>

      <LocationStatus message={message} location={location} />

      <button onClick={onLocationClick} disabled={loading}>
        {loading ? "📍 Getting Location..." : "📍 Use My Location"}
      </button>
    </section>
  );
}

export default LocationCard;
