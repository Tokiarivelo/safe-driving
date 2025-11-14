# Random Driver Positions Feature

This document describes the implementation of the random driver positions feature with GraphQL API and seeder script.

## Overview

The feature provides:
1. A GraphQL query to fetch nearby drivers around a coordinate
2. Random driver position generation for testing/development
3. A seeder script to populate drivers in Redis
4. Frontend integration for Web (Next.js) and Mobile (Flutter)

## Backend (NestJS + GraphQL)

### GraphQL API

#### Query: `nearbyDrivers`

Fetches drivers within a specified radius of a coordinate.

**Parameters:**
- `lat: Float!` - Center latitude
- `lng: Float!` - Center longitude
- `radiusMeters: Int` - Search radius in meters (default: 1500)
- `limit: Int` - Maximum number of drivers to return (default: 50)
- `mock: Boolean` - Whether to return mock/generated data (default: false)

**Response:**
```graphql
type NearbyDriversResult {
  count: Int!
  drivers: [Driver!]!
}

type Driver {
  id: ID!
  name: String!
  vehicle: String
  lat: Float!
  lng: Float!
  status: String
}
```

**Example Query:**
```graphql
query {
  nearbyDrivers(lat: 48.8566, lng: 2.3522, radiusMeters: 1500, limit: 50, mock: true) {
    count
    drivers {
      id
      name
      vehicle
      lat
      lng
      status
    }
  }
}
```

### Implementation

**Files:**
- `src/drivers/drivers.dto.ts` - GraphQL types and DTOs
- `src/drivers/drivers.utils.ts` - Random point generation utilities
- `src/drivers/drivers.utils.spec.ts` - Unit tests (11 tests)
- `src/drivers/drivers.service.ts` - Service with `getNearbyDrivers` method
- `src/drivers/drivers.resolver.ts` - GraphQL resolver

**Key Features:**
- Uses Haversine formula for accurate geographic calculations
- Queries Redis for real drivers when available
- Falls back to mock data generation when `mock=true` or no drivers found
- All generated points guaranteed to be within specified radius

### Seeder Script

**Location:** `apps/graphql-server/scripts/seed-drivers.ts`

**Usage:**
```bash
# From repository root
npm run seed:drivers -- --count=50 --lat=48.8566 --lng=2.3522 --radiusMeters=1500 --persist=true

# From graphql-server directory
pnpm seed:drivers -- --count=50 --lat=48.8566 --lng=2.3522 --radiusMeters=1500 --persist=true
```

**Options:**
- `--count` - Number of drivers to generate (default: 50)
- `--lat` - Center latitude (default: 48.8566 - Paris)
- `--lng` - Center longitude (default: 2.3522 - Paris)
- `--radiusMeters` - Radius in meters (default: 1500)
- `--persist` - Whether to save to Redis (default: false)

**Examples:**
```bash
# Generate 100 drivers in New York area
npm run seed:drivers -- --count=100 --lat=40.7128 --lng=-74.0060 --radiusMeters=2000 --persist=true

# Preview 20 drivers without persisting
npm run seed:drivers -- --count=20 --lat=51.5074 --lng=-0.1278
```

## Web Frontend (Next.js)

### GraphQL Query

**Location:** `apps/web/graphql/drivers/query.graphql`

### Components

1. **DriverMarker** (`components/map/DriverMarker.tsx`)
   - Renders individual driver markers on map
   - Shows popup with driver info (name, vehicle, status, ETA)
   - Uses Leaflet icons

2. **NearbyDriversZone** (`components/map/NearbyDriversZone.tsx`)
   - Fetches nearby drivers using Apollo Client
   - Auto-refetches when user location changes
   - Props: `userLocation`, `radiusMeters`, `limit`, `mock`

### Integration

The `NearbyDriversZone` component is integrated into `MapView.tsx`:

```tsx
<NearbyDriversZone
  userLocation={userLocation}
  radiusMeters={1500}
  limit={50}
  mock={true}  // Set to true for testing
/>
```

**Environment Variables:**
- `NEXT_PUBLIC_GRAPHQL_API_URL` - GraphQL endpoint
- `NEXT_PUBLIC_USE_MOCK_DRIVERS` - Optional flag to force mock data

## Mobile Frontend (Flutter)

### GraphQL Integration

**Files:**
- `lib/api/graph-ql/modules/drivers/drivers_queries.dart` - GraphQL queries
- `lib/api/graph-ql/types/driver_types.dart` - Type definitions
- `lib/services/drivers_service.dart` - Standalone service
- `lib/api/graph-ql/docs/driver_api.dart` - API documentation
- `lib/features/home/map/services/map_service_graphql.dart` - Updated map service

### Usage

**Standalone Service:**
```dart
import 'package:safe_driving/services/drivers_service.dart';

final driversService = DriversService();
final result = await driversService.getNearbyDrivers(
  lat: 48.8566,
  lng: 2.3522,
  radiusMeters: 1500,
  limit: 50,
  mock: true,
);

if (result != null) {
  print('Found ${result.count} drivers');
  for (var driver in result.drivers) {
    print('${driver.name} - ${driver.vehicle}');
  }
}
```

**Integrated with Map:**

The existing `MapServiceGraphQL` has been updated to use the new `nearbyDrivers` query:

```dart
final service = MapServiceGraphQL(
  GraphQLClientWrapper.instance,
  useMockData: true,  // Enable mock data
);

final drivers = await service.getDriversNearby(
  lat: 48.8566,
  lng: 2.3522,
  radiusKm: 1.5,
);
```

## Testing

### Backend Tests

Run unit tests:
```bash
cd apps/graphql-server
pnpm test drivers.utils.spec.ts
```

All 11 tests should pass, validating:
- Coordinate conversion (degrees/radians)
- Random point generation within radius
- Driver generation with correct fields
- Unique IDs
- Valid statuses

### Manual Testing

1. **Start GraphQL Server:**
   ```bash
   npm run graphql:dev
   ```

2. **Seed Test Data:**
   ```bash
   npm run seed:drivers -- --count=20 --lat=YOUR_LAT --lng=YOUR_LNG --persist=true
   ```

3. **Query via GraphQL Playground:**
   Navigate to `http://localhost:4000/graphql` and run:
   ```graphql
   query {
     nearbyDrivers(lat: YOUR_LAT, lng: YOUR_LNG, mock: true) {
       count
       drivers {
         id
         name
         vehicle
         lat
         lng
         status
       }
     }
   }
   ```

4. **Test Web UI:**
   ```bash
   npm run web:dev
   ```
   Open the map and check for driver markers around your location.

5. **Test Mobile UI:**
   ```bash
   cd apps/mobile
   flutter run
   ```
   Navigate to the map screen to see driver markers.

## Performance Considerations

- Default limit of 50 drivers prevents performance issues
- Web: Use marker clustering for > 200 drivers
- Mobile: Stream updates every 5 seconds (configurable)
- Redis queries use geospatial indexes for efficiency

## Security

- No authentication required for `nearbyDrivers` query (read-only)
- Seeder script is for development/testing only
- In production, set `mock=false` and ensure proper Redis configuration

## Future Enhancements

- Add driver filtering (by vehicle type, rating, etc.)
- Real-time updates via GraphQL subscriptions
- Driver authentication and profile management
- Distance-based ETA calculations
- Driver status updates (available/busy/offline)
