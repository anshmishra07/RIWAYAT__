import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// Mocked cultural locations with lat/lng, type, and name
const culturalLocations = [
  { id: 1, name: 'Bharatanatyam Academy', type: 'Dance', lat: 13.0827, lng: 80.2707, region: 'Tamil Nadu' },
  { id: 2, name: 'Madhubani Art Village', type: 'Art', lat: 26.2517, lng: 86.2746, region: 'Bihar' },
  { id: 3, name: 'Jaipur Literature Fest', type: 'Culture', lat: 26.9124, lng: 75.7873, region: 'Rajasthan' },
  { id: 4, name: 'Kathakali Center', type: 'Dance', lat: 9.9312, lng: 76.2673, region: 'Kerala' },
  { id: 5, name: 'Konark Sun Temple', type: 'Place', lat: 19.8876, lng: 86.0945, region: 'Odisha' },
];

// Haversine formula to calculate distance between two lat/lng points (in km)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    0.5 - Math.cos(dLat)/2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    (1 - Math.cos(dLon))/2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const defaultCenter = { lat: 22.9734, lng: 78.6569 }; // Center of India

const InteractiveMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [manualLocation, setManualLocation] = useState('');
  const [mapCenter, setMapCenter] = useState(defaultCenter);

  // Google Maps API key (replace with your own or use env variable)
  const GOOGLE_MAPS_API_KEY = 'YOUR_GOOGLE_MAPS_API_KEY';
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  // Geolocation handler
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(coords);
          setMapCenter(coords);
        },
        () => alert('Unable to retrieve your location.')
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  // Manual location entry (for demo, just parse as lat,lng)
  const handleManualLocation = () => {
    const [lat, lng] = manualLocation.split(',').map(Number);
    if (!isNaN(lat) && !isNaN(lng)) {
      const coords = { lat, lng };
      setUserLocation(coords);
      setMapCenter(coords);
    } else {
      alert('Please enter a valid latitude and longitude (e.g., 28.61,77.23)');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Cultural Map of India</h2>
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded mb-2 md:mb-0 md:mr-2 hover:bg-indigo-700"
          onClick={handleGetLocation}
        >
          Use My Location
        </button>
        <input
          type="text"
          placeholder="Enter your location (lat,lng)"
          value={manualLocation}
          onChange={e => setManualLocation(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 mr-2"
        />
        <button
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          onClick={handleManualLocation}
        >
          Set Location
        </button>
      </div>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={5}
        >
          {userLocation && (
            <Marker
              position={userLocation}
              icon={{
                url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                scaledSize: { width: 40, height: 40 },
              }}
            />
          )}
          {culturalLocations.map(loc => (
            <Marker
              key={loc.id}
              position={{ lat: loc.lat, lng: loc.lng }}
              label={loc.type[0]}
            />
          ))}
        </GoogleMap>
      ) : (
        <div className="text-center py-10 text-gray-500">Loading map...</div>
      )}
      {/* List of locations with distance */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Places to Explore</h3>
        <ul className="space-y-2">
          {culturalLocations.map(loc => {
            let distance = null;
            if (userLocation) {
              distance = getDistanceFromLatLonInKm(
                userLocation.lat,
                userLocation.lng,
                loc.lat,
                loc.lng
              ).toFixed(1);
            }
            return (
              <li key={loc.id} className="bg-gray-50 rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between">
                <span>
                  <span className="font-medium text-indigo-700">{loc.name}</span> <span className="text-xs text-gray-500 ml-2">[{loc.type}]</span>
                  <span className="block text-gray-500 text-sm">{loc.region}</span>
                </span>
                {distance && (
                  <span className="text-orange-600 font-semibold mt-2 md:mt-0">{distance} km away</span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default InteractiveMap;