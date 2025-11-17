// Geocoding web worker
// This worker handles reverse geocoding operations off the main thread

self.addEventListener('message', async (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'REVERSE_GEOCODE':
      await reverseGeocode(data);
      break;
    default:
      self.postMessage({ type: 'ERROR', error: 'Unknown message type' });
  }
});

async function reverseGeocode({ lat, lon, nominatimUrl }) {
  try {
    const url = `${nominatimUrl}?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    const response = await fetch(url, {
      headers: { 'User-Agent': 'safe-driving' },
    });

    if (!response.ok) {
      throw new Error(`Geocoding failed: ${response.status}`);
    }

    const data = await response.json();

    let locationName = 'Unknown location';

    if (data.address) {
      const road = data.address.road || data.address.highway;
      const neighbourhood =
        data.address.neighbourhood || data.address.suburb || data.address.city_district;

      if (road && neighbourhood) {
        locationName = `${road}, ${neighbourhood}`;
      } else if (road) {
        locationName = road;
      } else if (neighbourhood) {
        locationName = neighbourhood;
      } else {
        locationName = data.display_name || 'Unnamed place';
      }
    }

    self.postMessage({
      type: 'GEOCODE_RESULT',
      data: {
        lat,
        lon,
        locationName,
      },
    });
  } catch (error) {
    self.postMessage({
      type: 'GEOCODE_ERROR',
      error: error.message,
      data: { lat, lon },
    });
  }
}
