// Route calculation web worker
// This worker handles route calculations off the main thread

self.addEventListener('message', async (event) => {
  const { type, data } = event.data;

  switch (type) {
    case 'CALCULATE_ROUTE':
      await calculateRoute(data);
      break;
    default:
      self.postMessage({ type: 'ERROR', error: 'Unknown message type' });
  }
});

async function calculateRoute({ coordinates, orsUrl }) {
  try {
    const response = await fetch(orsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ coordinates }),
    });

    if (!response.ok) {
      throw new Error(`Route calculation failed: ${response.status}`);
    }

    const data = await response.json();
    
    self.postMessage({
      type: 'ROUTE_CALCULATED',
      data: {
        geometry: data.routes[0].geometry,
        distance: data.routes[0].summary.distance,
        duration: data.routes[0].summary.duration,
      },
    });
  } catch (error) {
    self.postMessage({
      type: 'ROUTE_ERROR',
      error: error.message,
    });
  }
}
