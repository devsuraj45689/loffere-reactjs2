import React, { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Autocomplete,
} from '@react-google-maps/api';

const libraries = ['places'];
const mapContainerStyle = {
  width: '100%',
  height: '500px',
};
const center = {
  lat: 37.7749, // Default latitude (San Francisco)
  lng: -122.4194, // Default longitude
};

function Map({ styles, isProductMap }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyBDVygSbeex7SyuVradtxkrolgOBz2l7qU', // Replace with your actual Google Maps API key
    libraries,
  });

  const [map, setMap] = useState(null);
  const [markerPosition, setMarkerPosition] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);

  const onLoad = (map) => {
    setMap(map);
  };

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();

      // Ensure the place has a geometry location
      if (place.geometry && place.geometry.location) {
        const location = place.geometry.location;
        setMarkerPosition({
          lat: location.lat(),
          lng: location.lng(),
        });

        // Center the map on the new place and zoom in
        map.panTo(location);
        map.setZoom(15);
      }
    }
  };

  const options = {
    fullscreenControl: false,
    zoomControl: false,
    gestureHandling: 'none',
    streetViewControl: false,
  };

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps...';

  return (
    <div style={{ paddingTop: '1rem' }}>
      {!isProductMap && (
        <Autocomplete
          onLoad={(autocomplete) => setAutocomplete(autocomplete)}
          onPlaceChanged={handlePlaceChanged}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="text"
              className="h-44 w-100 border border-input pl-2 rounded"
              placeholder="Enter Location"
            />
            <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-[#2CB1B5] text-white shadow hover:bg-[#24989b] h-9 px-1 py-1 l-search-icon">
              <span className="mr-1 ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </span>
            </button>
          </div>
        </Autocomplete>
      )}
      <GoogleMap
        mapContainerStyle={styles ?? mapContainerStyle}
        zoom={13}
        center={center}
        onLoad={onLoad}
        options={options}
      >
        {!isProductMap && markerPosition && (
          <Marker position={markerPosition} />
        )}
      </GoogleMap>
    </div>
  );
}

export default Map;
